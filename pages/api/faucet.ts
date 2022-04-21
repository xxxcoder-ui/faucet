// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parseMaticErrorReason, dripFunds } from '../../lib'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'

const { DEPLOYER_PRIVK } = process.env

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, type, account } = req.query
    const provider = await _getProvider(network.toString())
    const faucetContract = await _getContract(network.toString(), type.toString())
  } catch (err: any) {
    const reason: string = parseMaticErrorReason(err?.message)
    console.error(JSON.stringify(err, null, 2))
    res.status(500).json({ error: reason, status: 'error' })
  }
}

const _getContract = async (network: string, type: string) => {
  if (network === 'local') {
    
  }
}

const _getProvider = (network: string) => {
  if (network !== 'local') {
    const netName = network === 'polygon' ? 'matic' : 'maticmum'
    return new ethers.providers.InfuraProvider(netName, {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    })
  }
  return new ethers.providers.JsonRpcProvider('http://localhost:8545')
}
