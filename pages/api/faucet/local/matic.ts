// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { dripMatic } from '../../../../lib/faucets'
import { createLocalInterfaces } from '../../../../lib/interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const interfaces = await createLocalInterfaces(req.query)
    const tx = await dripMatic(interfaces)
    res.status(200).json({ status: 'ok', tx })
  } catch (err: any) {
    const reason = _errorReason(err)
    res.status(500).json({ error: reason, status: 'error' })
  }
}

const _errorReason = ({ message }: any): string => {
  const notEnoughRequiredTokens = message.includes('missing erc20')
  const faucetDisabled = message.includes('disabled')
  const faucetDry = message.includes('insufficient funds')
  const hasAlreadyUsed = message.includes('already used')
  const tooSoonForAnotherDrip = message.includes('too soon')
  if (notEnoughRequiredTokens) {
    return 'You dont have enough required erc20 tokens to use this faucet'
  }
  if (faucetDisabled) {
    return 'The faucet has been disabled'
  }
  if (faucetDry) {
    return 'The faucet is out of funds'
  }
  if (hasAlreadyUsed) {
    return 'You have already used the faucet'
  }
  if (tooSoonForAnotherDrip) {
    return 'It is too soon for another faucet request'
  }
  console.error(message)
  return 'An unknown error occured'
}
