import { Container } from '@mui/material'
import { FaucetForm } from '../components/FaucetForm'
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
