import { Button, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useMoralis } from 'react-moralis'
import { FaucetForm } from '../components/FaucetForm'
import { useAuth } from './_app'

const Home: NextPage = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis()
  const { isConnected } = useAuth()

  const handleDisconnect = async () => {
    await logout()
  }

  const handleConnectWallet = async () => {
    if (!isAuthenticated) {
      await authenticate({
        signingMessage: 'Fweb3 faucet authentication',
      })
    }
  }

  const renderConnectButton = () => {
    return <Button onClick={handleConnectWallet}>Connect Wallet</Button>
  }

  const renderLogoutButton = () => {
    return <Button onClick={handleDisconnect}>Disconnect</Button>
  }

  return (
    <Container>
      {isConnected ? renderLogoutButton() : renderConnectButton()}
      <FaucetForm />
    </Container>
  )
}

export default Home
