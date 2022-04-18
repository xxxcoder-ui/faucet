import { Box, Typography } from '@mui/material'

export const SplashScreen = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='space-evenly'
      alignItems='center'
      minHeight='80vh'
      color='aliceblue'
    >
      <Typography variant='h1'>Fweb3 Faucet</Typography>
      <Typography variant='h4' sx={{
        color: 'red'
      }}>Please Connect Wallet</Typography>
    </Box>
  )
}
