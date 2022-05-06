import { AuthProvider, NetworkProvider } from '../hooks'
import { ThemeProvider } from '@mui/material/styles'
import { Layout } from '../components/Layout'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'
import { theme } from '../theme'

function App({ Component, pageProps }: AppProps) {
  return (
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
  )
}

export default App
