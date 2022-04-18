import { green, red } from '@mui/material/colors'
import { useAuth, useNetwork } from '../../hooks'
import { useMoralis } from 'react-moralis'
import Box from '@mui/material/Box'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

const BoxItem = ({ children }: IDefaultProps): JSX.Element => {
  const theme = useTheme()

  const boxStyle = {
    display: 'flex',
    margin: theme.spacing(2),
    alignItems: 'center',
  }

  return <Box sx={boxStyle}>{children}</Box>
}

export const NetworkInformation = () => {
  const { networkName, networkAllowed } = useNetwork()
  const { isWeb3Enabled, isAuthenticated } = useMoralis()

  const renderConnectedAllowedNetwork = () => {
    return (
      <BoxItem>
        <>
          <CheckIcon
            fontSize='small'
            sx={{ color: green[400] }}
            style={{ minWidth: '40px' }}
          />
          <Typography variant='body1' noWrap sx={{ color: green[200] }}>
            {networkName}
          </Typography>
        </>
      </BoxItem>
    )
  }

  const renderConnectedWrongNetwork = () => {
    return (
      <BoxItem>
        <>
          <CloseIcon
            fontSize='small'
            sx={{ color: red[500] }}
            style={{ minWidth: '40px' }}
          />
          <Typography variant='body1' noWrap sx={{ color: red[500] }}>
            {networkName}
          </Typography>
        </>
      </BoxItem>
    )
  }
  if (!isAuthenticated || !isWeb3Enabled) {
    return (
      <BoxItem>
        <>
          <CloseIcon
            fontSize='small'
            sx={{ color: red[500] }}
            style={{ minWidth: '40px' }}
          />
          <Typography noWrap color={red[500]}>not connected</Typography>
        </>
      </BoxItem>
    )
  }

  return (
    <Box>
      {networkAllowed
        ? renderConnectedAllowedNetwork()
        : renderConnectedWrongNetwork()}
    </Box>
  )
}
