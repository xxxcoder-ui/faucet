import {
  ALLOWED_NETWORKS_MAP,
  MIN_REQUIRED_FWEB3_FOR_MATIC,
} from '../constants'

import { ethers } from 'ethers'
import { IAuthState, useAuth } from './useAuth'
import { INetworkState } from './useNetwork'
import { MoralisContextValue, useMoralis } from 'react-moralis'
import { useEffect, useState } from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
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
  const { account, chainId }: MoralisContextValue = useMoralis()
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { isLocalnet }: INetworkState = useNetwork()
  const Web3Api = useMoralisWeb3Api()
  const { isConnected }: IAuthState = useAuth()

  const fetchFweb3Balance = async () => {
    const opts = chainId && _createBalanceRequestOptions(chainId, account || '')
    const res = await Web3Api.account.getTokenBalances(opts as any)
    return res ? res[0] : { balance: '0' }
  }

  const fetchAdminNft = async () => {
    const opts = chainId && _createNFTRequestOptions(chainId, account || '')
    const { result = [] } = await Web3Api.account.getNFTsForContract(
      opts as any
    )
    return Array.isArray(result) ? result[0] : result
  }

  const checkAndSetPermissions = async () => {
    if (process.env.NEXT_PUBLIC_DISABLE_PERMISSIONS) {
      console.log('permissions disabled')
      setIsAdmin(true)
      setCanUseFweb3Faucet(true)
      setCanUseMaticFaucet(true)
      return
    }

    const adminNfts = await fetchAdminNft()
    const isAdmin: boolean = Object.keys(adminNfts).length !== 0

    if (isAdmin) {
      setIsAdmin(true)
      setCanUseFweb3Faucet(true)
      setCanUseMaticFaucet(true)
    } else {
      const { balance: balanceStr } = await fetchFweb3Balance()
      const erc20Balance = ethers.utils.parseEther(balanceStr)
      const enoughForMaticFaucet = erc20Balance.gt(MIN_REQUIRED_FWEB3_FOR_MATIC)
      const moreERC20ThanNeeded = erc20Balance.gt(MIN_REQUIRED_FWEB3_FOR_MATIC)
      setIsAdmin(false)
      setCanUseFweb3Faucet(!moreERC20ThanNeeded)
      setCanUseMaticFaucet(enoughForMaticFaucet)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const chainIsAllowed = Object.keys(ALLOWED_NETWORKS_MAP).includes(
          chainId || ''
        )
        if (!chainIsAllowed) {
          setIsAdmin(false)
          setCanUseFweb3Faucet(false)
          setCanUseMaticFaucet(false)
        } else if (isLocalnet) {
          setCanUseFweb3Faucet(true)
          setCanUseMaticFaucet(true)
        } else if (isConnected) {
          await checkAndSetPermissions()
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [account, chainId]) // eslint-disable-line
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
