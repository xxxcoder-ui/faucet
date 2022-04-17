import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { LoadingOverlay } from './LoadingOverlay'
import { usePermissions } from '../hooks/usePermissions'
import { useMoralis } from 'react-moralis'

export const FaucetForm = () => {
  const { account } = useMoralis()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState({})
  const { canUseMaticFaucet, canUseFweb3Faucet } = usePermissions()

  const handleMaticFaucet = async () => {
    try {
      setError('')
      setLoading(true)
      const network = 'local'
      const uri = `/api/faucet/${network}/matic?address=${account}`
      const res = await fetch(uri)
      const data = await res.json()
      const { error, transactionHash } = data
      if (error) {
        setError(error)
      } else {
        setResponse(transactionHash)
      }
      setLoading(false)
    } catch (e) {
      console.error(e)
    }
  }

  const handleFweb3Faucet = async () => {}

  const fweb3ButtonToolTip = canUseFweb3Faucet
    ? 'Get some FWEB3'
    : 'You dont meet the requirements for the faucet'

  const maticButtonToolTip = canUseMaticFaucet
    ? 'Get some MATIC'
    : 'You dont meet the requirements for the faucet'

  return (
    <>
      <LoadingOverlay
        isLoading={loading}
        loadingMessage='Sending Transaction...'
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={24}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            width: '80%',
            margin: '2em',
            padding: '2em',
          }}
        >
          <Typography variant='h4' sx={{ margin: '1em' }}>
            Fweb3 Faucet
          </Typography>
          <ButtonGroup
            size='large'
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: '2em',
            }}
          >
            <Tooltip title={fweb3ButtonToolTip} arrow>
              <div>
                <Button
                  disabled={!canUseFweb3Faucet}
                  variant='contained'
                  onClick={handleFweb3Faucet}
                >
                  Fweb3
                </Button>
              </div>
            </Tooltip>
            <Tooltip title={maticButtonToolTip} arrow>
              <div>
                <Button
                  disabled={!canUseMaticFaucet}
                  variant='contained'
                  onClick={handleMaticFaucet}
                >
                  MATIC
                </Button>
              </div>
            </Tooltip>
          </ButtonGroup>
          {response && <Typography>{JSON.stringify(response)}</Typography>}
          {error && <Typography>{error}</Typography>}
        </Paper>
      </Box>
    </>
  )
}
