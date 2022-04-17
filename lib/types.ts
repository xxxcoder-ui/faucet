import { ethers } from 'ethers'

export interface IEthersInterfaces {
  recipient: string
  provider: ethers.providers.InfuraProvider | ethers.providers.JsonRpcProvider
  wallet: ethers.Wallet
  contract: ethers.Contract
  faucetAddress: string
}
