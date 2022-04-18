// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  IEthersInterfaces,
  parseMaticErrorReason,
  createMumbaiInterfaces,
  dripMatic,
} from './../../../../lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const interfaces: IEthersInterfaces = await createMumbaiInterfaces(req.query)
    const tx = await dripMatic(interfaces)
    res.status(200).json({ status: 'ok', data: tx })
  } catch (err: any) {
    const reason: string = parseMaticErrorReason(err?.message)
    res.status(500).json({ error: reason, status: 'error' })
  }
}
