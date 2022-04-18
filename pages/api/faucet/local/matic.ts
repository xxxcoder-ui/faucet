// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  IEthersInterfaces,
  IFaucetResponse,
  dripMatic,
  createLocalInterfaces,
  parseMaticErrorReason,
} from '../../../../lib'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFaucetResponse>
) {
  try {
    const interfaces: IEthersInterfaces = await createLocalInterfaces(req.query)
    const tx = await dripMatic(interfaces)
    res.status(200).json({ status: 'ok', data: tx })
  } catch (err: any) {
    console.log({ err })
    const reason: string = parseMaticErrorReason(err)
    res.status(200).json({ error: reason, status: 'error' })
  }
}
