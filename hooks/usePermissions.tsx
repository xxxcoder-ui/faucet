import {
  ALLOWED_NETWORKS,
  MUMBAI_ERC20_TOKEN_ADDRESS,
  POLYGON_ERC20_TOKEN_ADDRESS,
  MIN_REQUIRED_FWEB3_FOR_MATIC,
  MUMBAI_ADMIN_NFT_ADDRESS,
  POLYGON_ADMIN_NFT_ADDRESS,
} from '../constants'
import { ethers } from 'ethers'
import { IMoralisResponse } from '../lib/types'
import { useAuth } from './useAuth'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useMoralisWeb3Api } from 'react-moralis'
import { useNetwork } from './useNetwork'

export const usePermissions = () => {
  const [canUseFweb3Faucet, setCanUseFweb3Faucet] = useState<boolean>(false)
  const [canUseMaticFaucet, setCanUseMaticFaucet] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const { account, chainId } = useMoralis()
  const { isLocalnet } = useNetwork()
  const Web3Api = useMoralisWeb3Api()
  const { isConnected } = useAuth()

  const fetchFweb3Balance = async () => {
    const opts = chainId && _createBalanceRequestOptions(chainId, account || '')
    const res = await Web3Api.account.getTokenBalances(opts as any)
    return res ? res[0] : { balance: '0' }
  }

  const fetchAdminNft = async (): Promise<IMoralisResponse> => {
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

    const adminNfts: IMoralisResponse = await fetchAdminNft()
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
        const chainIsAllowed = ALLOWED_NETWORKS.includes(chainId || '')
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

const _erc20AddressToUse = (chainId: string) => {
  if (chainId === '0x13881') {
    return MUMBAI_ERC20_TOKEN_ADDRESS
  } else if (chainId === '0x89') {
    return POLYGON_ERC20_TOKEN_ADDRESS
  } else {
    return ''
  }
}

const _adminNFTAddressToUse = (chainId: string): string => {
  if (chainId === '0x13881') {
    return MUMBAI_ADMIN_NFT_ADDRESS
  } else if (chainId === '0x89') {
    return POLYGON_ADMIN_NFT_ADDRESS
  } else {
    return ''
  }
}

const _createBalanceRequestOptions = (
  chainId: string,
  address: string
): IRequestOptions => {
  return {
    chain: chainId,
    address,
    token_addresses: [_erc20AddressToUse(chainId)],
  }
}

const _createNFTRequestOptions = (
  chainId: string,
  address: string
): IRequestOptions => {
  return {
    chain: chainId,
    address,
    token_address: _adminNFTAddressToUse(chainId),
  }
}
