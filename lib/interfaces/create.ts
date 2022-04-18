import { createContract } from './contract'
import { createProvider } from './providers'
import { createWallet } from './wallet'
import { ethers } from 'ethers'
import { getContractAddresses } from '../../contracts/addresses'
import { IEthersInterfaces, IInterfaceConfig } from '../types'
import { NextApiRequest } from 'next/types'

export const createInterfaces = async (
  req: NextApiRequest
): Promise<IEthersInterfaces> => {
  const config: IInterfaceConfig = _createInterfaceConfig(req)
  const provider:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.InfuraProvider = await createProvider(config)
  const wallet = await createWallet(provider, config)
  const contract: ethers.Contract = await createContract(wallet, config)
  const faucetAddress: string = getContractAddresses(config.network, [
    'fweb3EthFaucet',
  ])
  return {
    faucetAddress,
    provider,
    wallet,
    contract,
    ...config,
  }
}

const _createInterfaceConfig = (req: NextApiRequest): IInterfaceConfig => {
  const recipient: string = _validAddress(req?.query?.address) // throws
  const splitUrl: string[] = req?.url?.split('/') || []
  const action: string = splitUrl[2] || ''
  const network: string = splitUrl[3] || ''
  const type: string = splitUrl[4].split('?')[0] || ''
  return {
    recipient,
    action,
    network,
    type,
  }
}

const _validAddress = (address: string | string[]): string => {
  if (Array.isArray(address)) {
    return address[0]
  }
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return address
  }
  throw new Error('Address is invalid')
}
