import { AuthProvider, NetworkProvider } from '../hooks'
import { ThemeProvider } from '@mui/material/styles'
import { Layout } from '../components/Layout'
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from '../constants'
import { MoralisProvider } from 'react-moralis'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'
import { theme } from '../theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <NetworkProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NetworkProvider>
        </AuthProvider>
      </ThemeProvider>
    </MoralisProvider>
  )
}

export default App
