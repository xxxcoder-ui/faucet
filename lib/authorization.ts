import { NextApiRequest, NextApiResponse } from 'next'

const { FAUCET_API_TOKEN } = process.env

export interface IValidateDepositRequest {
  status: number
  reason?: string
}

export const getValidDepositRequest = (
  req: NextApiRequest
): IValidateDepositRequest => {
  const { headers, body } = req
  const { network, type, amount } = body
  const bearerToken = headers?.authorization?.split('Bearer ')[1]
  if (!bearerToken || bearerToken !== FAUCET_API_TOKEN) {
    return {
      status: 401,
      reason: 'unauthorized',
    }
  }
  if (!network || !type || !amount) {
    return {
      status: 400,
      reason: 'missing required fields',
    }
  }
  return {
    status: 200,
  }
}
