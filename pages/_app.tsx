import { createContext, useState, useEffect, useContext } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Layout } from '../components/Layout'
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from '../constants'
import { MoralisContextValue, MoralisProvider, useMoralis } from 'react-moralis'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const AuthContext = createContext({ isConnected: false })

const AuthProvider = ({ children }: IProps) => {
  const moralisState: MoralisContextValue = useMoralis()
  const {
    isAuthenticated,
    isWeb3Enabled,
    account,
    enableWeb3,
    isWeb3EnableLoading,
  } = moralisState
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const shouldReEnableWeb3 =
    isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading

    useEffect(() => {
    if (shouldReEnableWeb3) {
      enableWeb3()
    }
  }, [shouldReEnableWeb3]) // eslint-disable-line

  useEffect(() => {
    if (isAuthenticated && account) {
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

export const useAuth = () => useContext(AuthContext)

function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </MoralisProvider>
  )
}

export default App
