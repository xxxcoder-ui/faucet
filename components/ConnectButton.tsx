import { Button, Toolbar } from '@mui/material'
import { ErrorAlert } from './ErrorAlert'
import { LoadingButton } from '@mui/lab'
import { MoralisContextValue, useMoralis } from 'react-moralis'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export const ConnectButton = () => {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { authenticate, logout }: MoralisContextValue = useMoralis()
  const { isConnected } = useAuth()

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
  const handleDisconnect = async () => {
    await logout()
  }
  return (
    <Toolbar>
      {!isConnected ? (
        <LoadingButton
          variant='outlined'
          loading={loading}
          onClick={handleConnect}
          size='large'
        >
          Connect
        </LoadingButton>
      ) : (
        <Button variant='outlined' size='large' onClick={handleDisconnect}>
          Disconnect
        </Button>
      )}
      <ErrorAlert error={error} setError={setError} />
    </Toolbar>
  )
}
