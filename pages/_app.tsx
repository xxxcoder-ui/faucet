import { AuthProvider } from '../hooks/useAuth'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Layout } from '../components/Layout'
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from '../constants'
import { MoralisProvider } from 'react-moralis'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

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
