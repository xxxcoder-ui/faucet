// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loadAbi } from './../../contracts/abi/index'
import { getPrivk, getProvider } from '../../lib/interfaces'
import { ethers } from 'ethers'
import { getContractAddress } from './../../contracts/addresses/index'
import type { NextApiRequest, NextApiResponse } from 'next'

const GAS_LIMIT = 3000000

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, type, account } = req.query
    console.log(`[+] Initializing ${type} request on ${network}`)
    const privk = getPrivk(network.toString())
    const provider = await getProvider(network.toString())
    const wallet = await new ethers.Wallet(privk || '', provider)

    if (type === 'matic') {
      const maticFaucetAddress = getContractAddress(
        network.toString(),
        'fweb3MaticFaucet'
      )

      const maticFaucetAbi = loadAbi('fweb3MaticFaucet')
      const maticFaucetContract = new ethers.Contract(
        maticFaucetAddress,
        maticFaucetAbi,
        wallet
      )

      const tx = await maticFaucetContract.dripMatic(account, {
        gasLimit: GAS_LIMIT,
      })
      const receipt = await tx.wait()
      const endBalance = await provider.getBalance(maticFaucetAddress)

      console.log({
        sent_matic_to: account,
        matic_faucet_end_balance: endBalance.toString(),
        tx_receipt: tx,
      })

      res.status(200).json(receipt)
    } else {
      const fweb3FaucetAddress = getContractAddress(
        network.toString(),
        'fweb3TokenFaucet'
      )

      const fweb3TokenAddress = getContractAddress(
        network.toString(),
        'fweb3Token'
      )

      const fweb3FaucetAbi = loadAbi('fweb3TokenFaucet')
      const fweb3FaucetContract = new ethers.Contract(
        fweb3FaucetAddress,
        fweb3FaucetAbi,
        wallet
      )

      const fweb3TokenAbi = loadAbi('fweb3Token')
      const fweb3TokenContract = new ethers.Contract(
        fweb3TokenAddress,
        fweb3TokenAbi,
        wallet
      )

      const fweb3FaucetBalance = await fweb3TokenContract.balanceOf(
        fweb3FaucetContract.address
      )

      console.log('[+] dripping fweb3...')
      const tx = await fweb3FaucetContract.dripFweb3(account, {
        gasLimit: GAS_LIMIT,
      })

      const receipt = await tx.wait()
      console.log('[+] success!')
      console.log({
        sent_fweb3_to: account,
        fweb3_faucet_balance: fweb3FaucetBalance.toString(),
        tx: receipt.transactionHash,
      })
      res.status(200).json(receipt)
    }
  } catch (err: any) {
    console.error(JSON.stringify(err, null, 2))
    res.status(500).json({ error: _getError(err?.message), status: 'error', code: err.code })
  }
}

const _getError = (message: string) => {
  const hasLimitOfFweb3 = message.includes('limit') // requirement matches system error
  const exceedsGasLimit = message.includes('exceeds block gas limit')
  const missingGas = message.includes('gas required exceeds allowance')
  const underPriced = message.includes('transaction underpriced')
  const notEnoughGas = message.includes(
    'max fee per gas less than block base fee'
  )
  const gasTooLowForNextBlock = message.includes(
    'is too low for the next block'
  )

  const alreadyUsed = message.includes('used')
  const tooSoon = message.includes('timeout')
  const missingFweb3 = message.includes('missing erc20')
  const alreadyHaveMatic = message.includes('no need')
  const faucetDisabled = message.includes('disabled')
  const faucetDry = message.includes('dry')
  const didNotSend = message.includes('send failed')
  const cannotEstimateGas = message.includes('may require manual gas limit')

  console.log({
    hasLimitOfFweb3,
    exceedsGasLimit,
    missingGas,
    underPriced,
    notEnoughGas,
    gasTooLowForNextBlock,
    alreadyUsed,
    tooSoon,
    missingFweb3,
    alreadyHaveMatic,
    faucetDisabled,
    faucetDry,
    didNotSend,
    cannotEstimateGas
  })

  let error = 'An unknown error occured. Please reach out to #support'

  if (hasLimitOfFweb3 && !exceedsGasLimit && !cannotEstimateGas) {
    error = 'you already enough token to play'
  }

  if (cannotEstimateGas && !alreadyHaveMatic) {
    error = 'cant estimate gas. usually congested network. try again later'
  }

  if (exceedsGasLimit) {
    error = 'transaction gas exceeds limit'
  }

  if (alreadyUsed) {
    error = 'Faucet is single use only.'
  }
  if (tooSoon) {
    error = 'You must wait to use faucet again'
  }

  if (missingFweb3) {
    error = 'Matic faucet requires you have the required amount of fweb tokens'
  }

  if (faucetDisabled) {
    error = 'The faucet is disabled'
  }

  if (faucetDry) {
    error = 'Faucet is out of funds'
  }

  if (didNotSend) {
    error = 'The TX did not send. Please try again later'
  }

  if (notEnoughGas) {
    error = 'not enough gas'
  }

  if (gasTooLowForNextBlock) {
    error = 'gas is too low for next block'
  }

  if (alreadyHaveMatic) {
    error = 'you have more than enough already'
  }

  if (underPriced) {
    error = 'gas is under priced / unpredictable. wait a few min and try again'
  }
  if (missingGas) {
    error = 'Faucet contract needs gas money'
  }
  return error
}
