// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json({})
  } catch (err: any) {
    const error: string = err?.message || 'cannot process request'
    res.status(500).json({ error, status: 'error' })
  }
}
