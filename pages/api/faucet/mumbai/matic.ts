// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { dripMatic } from '../../../../lib/faucets'
import { createMumbaiInterfaces } from '../../../../lib/interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const interfaces = await createMumbaiInterfaces(req.query)
    const tx = await dripMatic(interfaces)
    res.status(200).json({ status: 'ok', tx })
  } catch (err: any) {
    const error: string = err?.message || 'cannot process request'
    res.status(500).json({ error, status: 'error' })
  }
}
