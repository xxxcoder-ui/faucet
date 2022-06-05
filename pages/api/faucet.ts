// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = process.env.1fweb.netlify.app
    const token = process.env.6Ldj20YgAAAAALAO6kg6_yxXlaerFOjRNmzppp8A
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
