// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { attemptTransaction } from './../../lib/transact'
import { checkOrigin } from '../../lib/cors'
import { ethers } from 'ethers'
import { formatError } from '../../lib/errors'
import { getContractAddress } from './../../contracts/addresses/index'
import { getPrivk, getProvider } from '../../lib/interfaces'
import { loadAbi } from './../../contracts/abi/index'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await checkOrigin(req)

    const { network, type, account } = req.query
    console.log(`[+] Initializing ${type} request on ${network}`)
    const privk = getPrivk(network.toString())

    if (!privk) {
      throw new Error('cannot load wallet')
    }

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

      const receipt = await attemptTransaction(
        provider,
        maticFaucetContract.dripMatic,
        account.toString()
      )

      if (!receipt) {
        throw new Error('Gas prices are too high. Please try again later')
      }

      const endBalance = await provider.getBalance(maticFaucetAddress)

      console.log({
        sent_matic_to: account,
        matic_faucet_end_balance: endBalance.toString(),
        tx_receipt: receipt.transactionHash,
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

      const receipt = await attemptTransaction(
        provider,
        fweb3FaucetContract.dripFweb3,
        account.toString()
      )

      if (!receipt) {
        throw new Error('Gas prices are too high. Please try again later')
      }

      const fweb3FaucetBalance = await fweb3TokenContract.balanceOf(
        fweb3FaucetContract.address
      )

      console.log({
        sent_fweb3_to: account,
        fweb3_faucet_balance: fweb3FaucetBalance.toString(),
        tx: receipt.transactionHash,
      })
      res.status(200).json(receipt)
    }
  } catch (err: any) {
    console.error(err?.message)
    res.status(500).json({
      error: formatError(err),
      status: 'error',
      code: err?.code || 'NO_CODE',
      raw: err
    })
  }
}
