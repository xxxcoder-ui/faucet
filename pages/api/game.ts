import { fetchAccountGameState } from './../../lib/game'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { network, address } = req.query
    if (network === 'original') {
      res.status(500).json({ status: 'error', error: 'network not setup yet' })
      return
    }
    const gameState = await fetchAccountGameState(
      network.toString(),
      address.toString()
    )
    res.status(200).json(gameState)
  } catch (err: any) {
    console.error()
    res.status(500).json({
      status: 'error',
      error: err?.message,
      code: 'none yet',
    })
  }
}
