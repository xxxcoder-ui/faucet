import { createContext, useState, useEffect, useContext } from 'react'
import { MoralisContextValue, useMoralis } from 'react-moralis'

export interface IAuthState {
  isConnected: boolean
}

const defaultAuthState: IAuthState = { isConnected: false }

const AuthContext = createContext(defaultAuthState)

const AuthProvider = ({ children }: IDefaultProps) => {
  const {
    isAuthenticated,
    isWeb3Enabled,
    account,
    enableWeb3,
    isWeb3EnableLoading,
  }: MoralisContextValue = useMoralis()

  const [isConnected, setIsConnected] = useState<boolean>(false)
  const shouldReEnableWeb3: boolean =
    !account && isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading

  useEffect(() => {
    if (shouldReEnableWeb3) {
      enableWeb3()
    }
  }, [shouldReEnableWeb3]) // eslint-disable-line

  useEffect(() => {
    if (isAuthenticated && account && isWeb3Enabled) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [isWeb3Enabled, isAuthenticated, account]) // eslint-disable-line
  return (
    <AuthContext.Provider value={{ isConnected }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
