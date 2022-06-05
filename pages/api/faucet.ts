// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env.example
    const token = process.env.example
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
    console.log({ response, data })
    res.status(200).json(data)
  } catch (err: any) {
    console.log({ err })
    res.status(500).json(err)
  }
}
