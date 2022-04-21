import { getFaucetbalances } from './../../lib/balances';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const balances = await getFaucetbalances(req)
    res.status(200).json(balances)
  } catch (e: any) {
    res.status(500).json({ status: 'error', error: e?.message || 'no error message'})
  }
}
