import { BigNumber, ethers } from 'ethers'

export interface IInterfaceConfig {
  recipient: string
  action: string
  network: string
  type: string
}

export enum NETWORKS {
  MUMBAI = 'mumbai',
  LOCAL = 'local',
  POLYGON = 'polygon',
}

export interface IEthersInterfaces {
  recipient: string
  provider: ethers.providers.InfuraProvider | ethers.providers.JsonRpcProvider
  wallet: ethers.Wallet
  contract: ethers.Contract
  faucetAddress: string
}

export interface IMoralisResponse {
  token_address?: string
  token_id?: string
  block_number_minted?: string
  owner_of?: string
  block_number?: string
  amount?: string
  contract_type?: string
  name?: string
  symbol?: string
  token_uri?: string
  metadata?: string
  synced_at?: string
  is_valid?: number
  syncing?: number
  frozen?: number
}

export interface IFaucetResponse {
  status: string
  error?: string
  data?: ethers.providers.TransactionReceipt | IMoralisResponse
}
export interface IGasFees {
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  gasPrice?: string
}
