import { ethers } from 'ethers'

export interface IFaucetRequest {
  network: string
  type?: string
  account?: string
  amount?: string
  faucetContractName?: string
}

export interface IEthersInterfaces extends IFaucetRequest {
  provider: Provider
  wallet: ethers.Wallet
  contract: ethers.Contract
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

export type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider
