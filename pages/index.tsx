import { Container, Typography } from '@mui/material'
import { FaucetForm } from '../components/Faucet/FaucetForm'
import { SplashScreen } from '../components/SplashScreen'
import { useAuth } from '../hooks/useAuth'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  const { isConnected } = useAuth()
  // return (
  //   <Container>{isConnected ? <FaucetForm /> : <SplashScreen />}</Container>
  // )
  return (
    <Container>
      <Typography variant='h3'>Sorry. The faucet is down for maintenance.</Typography>
      <Typography variant='h4'>Please check back tomorrow</Typography>
    </Container>
  )
}

export default Home
