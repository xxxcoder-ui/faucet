import { useEffect, useState } from 'react'
import { yellow } from '@mui/material/colors'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
interface ILoadingProps {
  isLoading: boolean
  loadingMessage: string
}

export const LoadingOverlay = ({ isLoading }: ILoadingProps): JSX.Element => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage('Sending Transaction...')
    clearTimeout()
    setTimeout(() => {
      setMessage('Please stay on the screen...')
    }, 10000)
    setTimeout(() => {
      setMessage('Transactions can sometimes take a while...')
    }, 20000)
    setTimeout(() => {
      setMessage("You're a great holder-on-er...")
    }, 30000)
    setTimeout(() => {
      setMessage("I know its taking long... please don't leave...")
    }, 40000)

    return () => clearTimeout()
  }, [isLoading])

  return (
    <Backdrop sx={{ zIndex: 10000 }} open={isLoading}>
      <Container
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={100} />
        <Typography variant='h4' sx={{ marginTop: 8, color: yellow[300] }}>
          {message}
        </Typography>
      </Container>
    </Backdrop>
  )
}
