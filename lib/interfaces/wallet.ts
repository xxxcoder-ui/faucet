import { IFaucetRequest, Provider } from './../types'
import { ethers } from 'ethers'

export const createWallet = async (
  provider: Provider,
  { network, type }: IFaucetRequest
): Promise<ethers.Wallet> => {
  console.log('creating wallet')
  const privk: string = _getPrivKey(network, type || '')
  console.log(`has privkey: ${!!privk}`)
  const wallet: ethers.Wallet = new ethers.Wallet(privk, provider)
  return wallet
}

const _getPrivKey = (network: string, type: string): string => {
  const ENVNAME: string = `${network.toUpperCase()}_${type.toUpperCase()}_PRIVK`
  console.log(`getting private key from env ${ENVNAME}`)
  return process.env[ENVNAME] ?? ''
}
