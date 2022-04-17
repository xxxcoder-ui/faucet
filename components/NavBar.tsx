import { ConnectButton } from './ConnectButton'
import { NetworkInformation } from './NetworkInformation'
import { Toolbar } from '@mui/material'
import { ErrorAlert } from './ErrorAlert'
import { useNetwork } from '../hooks'
import { useEffect, useState } from 'react'

export const NavBar = () => {
  const { networkAllowed } = useNetwork()
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (networkAllowed) {
      setError('')
    } else {
      setError('Connect to wrong network')
    }
  }, [networkAllowed])
  return (
    <>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <ConnectButton />
        <NetworkInformation />
      </Toolbar>
      <ErrorAlert error={error} setError={setError} />
    </>
  )
}
