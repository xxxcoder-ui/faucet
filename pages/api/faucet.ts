// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loadAbi } from './../../contracts/abi/index'
import { getPrivk, getProvider } from '../../lib/interfaces'
import { ethers } from 'ethers'
import { getContractAddress } from './../../contracts/addresses/index'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, type, account } = req.query
    const privk = getPrivk(network.toString())
    const provider = await getProvider(network.toString())
    const wallet = await new ethers.Wallet(privk || '', provider)
    if (type === 'matic') {
      console.log(`sending matic to: ${account}`)
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

      const tx = await maticFaucetContract.dripMatic(account)
      const receipt = await tx.wait()
      const maticFaucetBalance = await provider.getBalance(
        maticFaucetContract.address
      )
      console.log({
        sent_matic_to: account,
        matic_faucet_balance: maticFaucetBalance.toString(),
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
      console.log({
        sent_fweb3_to: account,
        fweb3_faucet_balance: fweb3FaucetBalance.toString(),
      })
      const tx = await fweb3FaucetContract.dripFweb3(account)
      const receipt = await tx.wait()
      res.status(200).json(receipt)
    }
  } catch (err: any) {
    const raw = JSON.stringify(err, null, 2)
    console.error(raw)
    res
      .status(500)
      .json({ error: _getError(err?.message), status: 'error', raw })
  }
}


const _getError = (message: string) => {
  const alreadyUsed = message.includes('already used')
  const tooSoon = message.includes('too soon')
  const missingFweb3 = message.includes('missing fweb3')
  const faucetDisabled = message.includes('disabled')
  const faucetDry = message.includes('dry')
  const didNotSend = message.includes('send failed')
  if (alreadyUsed) {
    return 'Faucet is single use only.'
  }
  if (tooSoon) {
    return 'You must wait to use faucet again'
  }

  if (missingFweb3) {
    return 'Matic faucet requires you have the required amount of fweb tokens'
  }

  if (faucetDisabled) {
    return 'The faucet is disabled'
  }

  if (faucetDry) {
    return 'Faucet is out of funds'
  }

  if (didNotSend) {
    return 'The TX did not send. Please try again later'
  }

  return 'An unknown error occured. Please reach out to #support'
}
