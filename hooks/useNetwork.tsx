import { ALLOWED_NETWORKS_MAP } from '../constants'
import { createContext, useContext, useEffect, useState } from 'react'
import { MoralisContextValue, useMoralis } from 'react-moralis'
import WrappedInChains from 'wrapped-in-chains'

export interface INetworkState {
  networkAllowed: boolean
  networkName: string
  isLocalnet: boolean
  apiRoute: Nullable<string>
}

const defaultNetworkState: INetworkState = {
  networkAllowed: false,
  networkName: 'Not Connected',
  isLocalnet: false,
  apiRoute: null
}

const NetworkContext = createContext(defaultNetworkState)

const NetworkProvider = ({ children }: IDefaultProps) => {
  const [networkAllowed, setNetworkAllowed] = useState<boolean>(true)
  const [networkName, setNetworkName] = useState<string>('Not Connected')
  const [apiRoute, setApiRoute] = useState<Nullable<string>>(null)
  const [isLocalnet, setIsLocalnet] = useState<boolean>(false)
  const { chainId }: MoralisContextValue = useMoralis()

  useEffect(() => {
    if (chainId) {
      if (chainId === '0x539') {
        setNetworkAllowed(true)
        setIsLocalnet(true)
        setNetworkName('localhost')
        setApiRoute('local')
      } else {
        const { name: networkName } = WrappedInChains.getById(chainId)
        const allowed: boolean = Object.keys(ALLOWED_NETWORKS_MAP).includes(chainId)
        setNetworkName(networkName)
        setNetworkAllowed(allowed)
        setIsLocalnet(false)
        allowed && setApiRoute(ALLOWED_NETWORKS_MAP[chainId])
      }
    }
  }, [chainId]) // eslint-disable-line
  return (
    <NetworkContext.Provider
      value={{
        networkAllowed,
        networkName,
        isLocalnet,
        apiRoute
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
