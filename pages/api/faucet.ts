// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers'
import { getContractAddress } from './../../contracts/addresses/index'
import fweb3Erc20FaucetABI from '../../contracts/abi/fweb3Erc20Faucet.json'
import fweb3EthFaucetABI from '../../contracts/abi/fweb3EthFaucet.json'
import fweb3TokenABI from '../../contracts/abi/fweb3Token.json'
import type { NextApiRequest, NextApiResponse } from 'next'

const { LOCAL_PRIVK, MUMBAI_PRIVK, POLYGON_PRIVK  } = process.env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, type, account } = req.query
    const privk = _selectPrivk(network.toString())
    const provider = await _getProvider(network.toString())
    const wallet = await new ethers.Wallet(privk || '', provider)
    if (type === 'matic') {
      const maticFaucetAddress = getContractAddress(
        network.toString(),
        'fweb3EthFaucet'
      )
      const maticFaucetContract = new ethers.Contract(
        maticFaucetAddress,
        fweb3EthFaucetABI.abi,
        wallet
      )
      const tx = await maticFaucetContract.dripEth(account)
      const receipt = await tx.wait()
      const maticFaucetBalance = await provider.getBalance(
        maticFaucetContract.address
      )
      console.log({ maticFaucetBalance: maticFaucetBalance.toString() })
      res.status(200).json(receipt)
    } else {
      const fweb3FaucetAddress = getContractAddress(
        network.toString(),
        'fweb3Erc20Faucet'
      )
      const fweb3TokenAddress = getContractAddress(
        network.toString(),
        'fweb3Token'
      )
      const fweb3FaucetContract = new ethers.Contract(
        fweb3FaucetAddress,
        fweb3Erc20FaucetABI.abi,
        wallet
      )
      const fweb3TokenContract = new ethers.Contract(
        fweb3TokenAddress,
        fweb3TokenABI.abi,
        wallet
      )
      const fweb3FaucetBalance = await fweb3TokenContract.balanceOf(
        fweb3FaucetContract.address
      )
      console.log({ fweb3FaucetBalance: fweb3FaucetBalance.toString() })
      const tx = await fweb3FaucetContract.dripERC20(account)
      const receipt = await tx.wait()
      res.status(200).json(receipt)
    }
  } catch (err: any) {
    console.error(JSON.stringify(err, null, 2))
    res.status(500).json({ error: err.message, status: 'error' })
  }
}

type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider

const _getProvider = (network: string): Provider => {
  if (network !== 'local') {
    console.log('not local')
    const netName = network === 'polygon' ? 'matic' : 'maticmum'
    return new ethers.providers.InfuraProvider(netName, {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    })
  }
  return new ethers.providers.JsonRpcProvider('http://localhost:8545')
}

const _selectPrivk = (network: string) => {
  if (network === 'polygon') {
    return POLYGON_PRIVK
  } else if (network === 'mumbai') {
    return MUMBAI_PRIVK
  } else {
    return LOCAL_PRIVK
  }
}
