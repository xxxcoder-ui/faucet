import { ethers } from 'ethers'

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
