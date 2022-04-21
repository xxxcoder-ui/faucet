import { NextApiRequest, NextApiResponse } from 'next';
import {
  depositFaucetFunds,
  IValidateDepositRequest,
  getValidDepositRequest,
} from '../../lib'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const { status, reason }: IValidateDepositRequest = getValidDepositRequest(req)
    // if (status !== 200) {
    //   res.status(status).json(reason)
    //   return
    // }
    // const receipt = await depositFaucetFunds(req)
    // res.status(200).json(receipt)
    res.status(200).json('ok')
  } catch (e: any) {
    console.error(e?.message)
    res.status(500).json({ status: 'error', error: e?.message || 'unknown error occured' })
  }
}
