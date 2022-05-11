declare var window: any

import { ALLOWED_NETWORKS } from '../constants'
import { createContext, useContext, useEffect, useState } from 'react'
import WrappedInChains from 'wrapped-in-chains'
import { useAuth } from './useAuth'

export interface INetworkState {
  networkAllowed: boolean
  networkName: string
  isLocalnet: boolean
  chainId: number
}

const defaultNetworkState: INetworkState = {
  networkAllowed: false,
  networkName: 'Not Connected',
  isLocalnet: false,
  chainId: null,
}

const NetworkContext = createContext(defaultNetworkState)

const NETNAMES = {
  maticmum: 'Mumbai',
  matic: 'Polygon'
}

const NetworkProvider = ({ children }: IDefaultProps) => {
  const [networkName, setNetworkName] = useState<string>('Not Connected')
  const [networkAllowed, setNetworkAllowed] = useState<boolean>(true)
  const [isLocalnet, setIsLocalnet] = useState<boolean>(false)
  const [chainId, setChainId] = useState(null)
  const { provider, isConnected } = useAuth()

  useEffect(() => {
    if (window?.ethereum) {
      window?.ethereum.on('networkChanged', setChainId)
      return () =>
        window?.ethereum.removeListener('accountsChanged', setChainId)
    }
  }, [])

  useEffect(() => {
    if (!isConnected) {
      setIsLocalnet(false)
      setNetworkName('')
      setChainId(null)
      setNetworkAllowed(false)
    }
  }, [isConnected])

  useEffect(() => {
    ;(async () => {
      try {
        if (provider) {
          const { chainId, name } = await provider.getNetwork()
          console.log({ chainId, name })
          const regularName = NETNAMES[name] ?? name
          setNetworkName(regularName)
          setChainId(chainId)
          if (name === 'maticmum' || name === 'matic' || chainId === 1337) {
            setNetworkAllowed(true)
            setChainId(chainId)
          }
          if (chainId === 1337) {
            setIsLocalnet(true)
          }
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [chainId, provider])
  return (
    <NetworkContext.Provider
      value={{
        networkAllowed,
        networkName,
        isLocalnet,
        chainId,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
