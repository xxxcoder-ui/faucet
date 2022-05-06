import {
  ALLOWED_NETWORKS_MAP,
  MIN_REQUIRED_FWEB3_FOR_MATIC,
} from '../constants'

import { ethers } from 'ethers'
import { IAuthState, useAuth } from './useAuth'
import { INetworkState } from './useNetwork'
import { useEffect, useState } from 'react'
import { useNetwork } from './useNetwork'
import { getContractAddress } from '../contracts/addresses'

export interface IPermissionsState {
  isAdmin: boolean
  canUseMaticFaucet: boolean
  canUseFweb3Faucet: boolean
}

export const usePermissions = (): IPermissionsState => {
  const [canUseFweb3Faucet, setCanUseFweb3Faucet] = useState<boolean>(false)
  const [canUseMaticFaucet, setCanUseMaticFaucet] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { isLocalnet }: INetworkState = useNetwork()
  const { isConnected }: IAuthState = useAuth()

  return {
    isAdmin,
    canUseMaticFaucet,
    canUseFweb3Faucet,
  }
}

interface IRequestOptions {
  chain?: string
  address?: string
  token_addresses?: string[]
  token_address?: string
}

const _createBalanceRequestOptions = (
  chainId: string,
  address: string
): IRequestOptions => {
  const networkName = ALLOWED_NETWORKS_MAP[chainId]
  const fweb3TokenAddress = getContractAddress(networkName, 'fweb3Token')
  return {
    chain: chainId,
    address,
    token_addresses: [fweb3TokenAddress],
  }
}

const _createNFTRequestOptions = (
  chainId: string,
  address: string
): IRequestOptions => {
  const networkName = ALLOWED_NETWORKS_MAP[chainId]
  const adminNftAddress = getContractAddress(networkName, 'fweb3AdminNft')
  return {
    chain: chainId,
    address,
    token_address: adminNftAddress,
  }
}
