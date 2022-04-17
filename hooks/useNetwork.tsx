import { ALLOWED_NETWORKS } from '../constants'
import { createContext, useContext, useEffect, useState } from 'react'
import { MoralisContextValue, useMoralis } from 'react-moralis'
import WrappedInChains from 'wrapped-in-chains'

interface INetworkState {
  networkAllowed: boolean
  networkName: string
  isLocalnet: boolean
}

const defaultNetworkState: INetworkState = {
  networkAllowed: false,
  networkName: 'Not Connected',
  isLocalnet: false
}

const NetworkContext = createContext(defaultNetworkState)

const NetworkProvider = ({ children }: IDefaultProps) => {
  const [networkAllowed, setNetworkAllowed] = useState(true)
  const [networkName, setNetworkName] = useState('Not Connected')
  const [isLocalnet, setIsLocalnet] = useState<boolean>(false)
  const { chainId }: MoralisContextValue = useMoralis()

  useEffect(() => {
    if (chainId) {
      if (chainId === '0x539') {
        setNetworkAllowed(true)
        setIsLocalnet(true)
        setNetworkName('localhost')
      } else {
        const { name: networkName } = WrappedInChains.getById(chainId)
        const allowed = (chainId && ALLOWED_NETWORKS.includes(chainId)) || false
        setNetworkName(networkName)
        setNetworkAllowed(allowed)
        setIsLocalnet(false)
      }
    }
  }, [chainId]) // eslint-disable-line
  return (
    <NetworkContext.Provider
      value={{
        networkAllowed,
        networkName,
        isLocalnet
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

const useNetwork = () => useContext(NetworkContext)

export { NetworkProvider, useNetwork }
