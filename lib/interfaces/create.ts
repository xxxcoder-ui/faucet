import { IFaucetRequest, Provider } from './../types';
import { createContract } from './contract'
import { createProvider } from './providers'
import { createWallet } from './wallet'
import { ethers } from 'ethers'
import { IEthersInterfaces } from '../types'

export const createFaucetInterfaces = async (
  faucetRequest: IFaucetRequest
): Promise<IEthersInterfaces> => {
  console.log('creating faucet interfaces')
  const provider: Provider = await createProvider(faucetRequest)
  const wallet = await createWallet(provider, faucetRequest)
  const contract: ethers.Contract = await createContract(wallet, faucetRequest)
  const interfaces = {
    provider,
    wallet,
    contract,
    account: _validAddress(faucetRequest.account || ''),
    ...faucetRequest
  }
  return interfaces
}

export const createDepositInterfaces = async (faucetRequest: IFaucetRequest) => {
  const provider: Provider = await createProvider(faucetRequest)
  const wallet = await createWallet(provider, faucetRequest)
  const contract = await createContract(wallet, faucetRequest)
  return {
    provider,
    wallet,
    contract,
    ...faucetRequest
  }
}



const _validAddress = (address: string): string => {
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return address
  }
  throw new Error('Address is invalid')
}
