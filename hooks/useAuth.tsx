declare var window: any

import { createContext, useState, useEffect, useContext } from 'react'
import { ethers } from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
export interface IAuthState {
  isConnected: boolean
  authenticate: () => void
  deauthenticate: () => void
  account: string
  provider: Web3Provider
}

const defaultAuthState: IAuthState = {
  isConnected: false,
  authenticate: () => {},
  deauthenticate: () => {},
  account: '',
  provider: null,
}

const AuthContext = createContext(defaultAuthState)

const AuthProvider = ({ children }: IDefaultProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState<string>('')

  const deauthenticate = () => {
    setAccount('')
    setIsConnected(false)
  }

  const authenticate = async () => {
    try {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          'any'
        )
        await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()
        const account = await signer?.getAddress()

        setProvider(provider)
        setAccount(account)
        setIsConnected(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleAccountsChanged = (accounts) => {
    setAccount(accounts?.[0] || '')
  }

  const handleDisconnect = () => {
    setAccount('')
    setIsConnected(false)
  }

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('disconnect', handleDisconnect)

      return () =>
        window?.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        )
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        if (window?.ethereum && provider) {
          const signer = await provider.getSigner()
          const account = await signer?.getAddress()
          if (account) {
            setAccount(account)
            setIsConnected(true)
          }
        }
      } catch (e) {
        console.error(e)
      }
    })()
  }, [provider])

  return (
    <AuthContext.Provider
      value={{ isConnected, authenticate, account, provider, deauthenticate }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
