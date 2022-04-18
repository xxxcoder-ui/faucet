// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parseMaticErrorReason, dripMatic } from './../../../../lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tx = await dripMatic(req)
    res.status(200).json({ status: 'ok', data: tx })
  } catch (err: any) {
    const reason: string = parseMaticErrorReason(err?.message)
    res.status(500).json({ error: reason, status: 'error' })
  }
}
