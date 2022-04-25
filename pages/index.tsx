import { Container, Typography } from '@mui/material'
import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  const { isConnected } = useAuth()
  return (
    <Container>{isConnected ? <FaucetForm /> : <SplashScreen />}</Container>
  )
}

export default Home
