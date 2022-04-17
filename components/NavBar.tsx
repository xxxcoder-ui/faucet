import { ConnectButton } from './ConnectButton'
import { NetworkInformation } from './NetworkInformation'
import { Toolbar } from '@mui/material'

export const NavBar = () => {
  return (
    <Toolbar disableGutters>
      <ConnectButton />
      <NetworkInformation />
    </Toolbar>
  )
}
