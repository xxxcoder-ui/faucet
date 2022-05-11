// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { attemptTransaction } from './../../lib/transact'
import { checkOrigin } from '../../lib/cors'
import { ethers } from 'ethers'
import { formatError } from '../../lib/errors'
import { getContractAddress } from './../../contracts/addresses/index'
import { getPrivk, getProvider } from '../../lib/interfaces'
import { loadAbi } from './../../contracts/abi/index'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ALLOWED_NETWORKS } from '../../constants'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env.FAUCET_API_URL
    const token = process.env.FAUCET_API_TOKEN
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(req.body)
    }
    const response = await fetch(url, opts)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err: any) {
    console.log({ err })
    res.status(500).json(err)
  }
}
