// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createLocalInterfaces } from '../../../../lib/interfaces/create'
import {
  getLocalFaucetBalance,
  depositLocalMatic,
} from '../../../../lib/deposit'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const interfaces = await createLocalInterfaces(req.query)
    const tx = await depositLocalMatic(interfaces)
    const newBalance = await getLocalFaucetBalance(interfaces)
    res.status(200).json({ status: 'ok', tx, newBalance })

  } catch (err: any) {
    const error: string = err?.message || 'cannot process request'
    res.status(500).json({ error, status: 'error' })
  }
}
