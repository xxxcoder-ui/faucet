import { NextApiRequest } from 'next'
import { IFaucetRequest } from './types'

import { createDepositInterfaces, getFaucetContractName } from './interfaces'

export const depositFaucetFunds = async (req: NextApiRequest) => {
  const faucetRequest: IFaucetRequest = req.body
  const faucetContractName = getFaucetContractName(faucetRequest.type || '')
  const interfaces = await createDepositInterfaces({
    faucetContractName,
    ...faucetRequest,
  })
  console.log('wallet:', interfaces.wallet.address)
  const tx = await interfaces.wallet.sendTransaction({
    to: interfaces.contract.address,
    value: interfaces.amount,
  })
  const receipt = tx.wait()
  return receipt
}
