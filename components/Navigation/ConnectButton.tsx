import { Button, AppBar, Typography, useTheme, Toolbar } from '@mui/material'
import { ErrorAlert } from '../ErrorAlert'
import { IAuthState, useAuth } from '../../hooks'
import { LoadingButton } from '@mui/lab'
import { useState } from 'react'

export const ConnectButton = () => {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { isConnected }: IAuthState = useAuth()
  const { authenticate, deauthenticate } = useAuth()
  const theme = useTheme()

  const styles = {
    connectButton: {
      // padding: '1em'
    }
  }

  const handleConnect = async () => {
    try {
      setError('')
      setLoading(true)
      await authenticate()
      setLoading(false)
    } catch (e: any) {
      setError(e?.message)
      setLoading(false)
    }
  }
  const handleDisconnect = () => {
    deauthenticate()
  }
  return (
    <>
      {!isConnected ? (
        <LoadingButton
          variant='contained'
          loading={loading}
          onClick={handleConnect}
          size='large'
          fullWidth
          sx={{
            background: 'red',
            ":hover": {
              background: 'green'
            }
          }}
        >
          <Typography variant='body1'>Connect</Typography>
        </LoadingButton>
      ) : (
        <Button
          sx={styles.connectButton}
          variant='contained'
          size='large'
          onClick={handleDisconnect}
        >
          <Typography>Disconnect</Typography>
        </Button>
      )}
      <ErrorAlert error={error} setError={setError} />
    </>
  )
}
