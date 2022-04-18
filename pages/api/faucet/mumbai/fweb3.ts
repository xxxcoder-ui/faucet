// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  IEthersInterfaces,
  parseFweb3ErrorReason,
  createInterfaces,
  dripFweb3,
} from './../../../../lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tx = await dripFweb3(req)
    res.status(200).json({ status: 'ok', data: tx })
  } catch (err: any) {
    const reason: string = parseFweb3ErrorReason(err?.message)
    res.status(500).json({ error: reason, status: 'error' })
  }
}
