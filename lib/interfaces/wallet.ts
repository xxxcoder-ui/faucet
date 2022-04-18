import { IInterfaceConfig } from './../types'
import { ethers } from 'ethers'

export const createWallet = async (
  provider: ethers.providers.InfuraProvider | ethers.providers.JsonRpcProvider,
  { network, type }: IInterfaceConfig
): Promise<ethers.Wallet> => {
  const privk: string = _getPrivKey(network, type)
  const wallet: ethers.Wallet = new ethers.Wallet(privk, provider)
  return wallet
}

const _getPrivKey = (network: string, type: string): string => {
  const ENVNAME: string = `${network.toUpperCase()}_${type.toUpperCase()}_PRIVK`
  return process.env[ENVNAME] ?? ''
}
