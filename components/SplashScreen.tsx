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
      <Typography variant='h3'>Fweb3 Faucet</Typography>
      <Typography variant='h5'>The polygon network can be slow or congested at times and you may experience issues. If you do, please try again after some time (usually 20 min is good enough). If you are still having issues please try a few times over the course of an hour or more before reaching out to support.</Typography>
      <Typography variant='h6'>Faucet requirements</Typography>
      <Typography variant='h6'>1. You have not used any of the faucets we have released previously</Typography>
      <Typography variant='h6'>2. One drip per account</Typography>
      <Typography variant='h6'>3. You must have 300 fweb3 to use the matic faucet</Typography>
      <Typography variant='body1'>If you get an error you are unsure of it may be for one of the reasons above</Typography>
    </Box>
  )
}
