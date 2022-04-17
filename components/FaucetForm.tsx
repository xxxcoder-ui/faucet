import { Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { LoadingOverlay } from './LoadingOverlay'

export const FaucetForm = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendAddress, setSendAddress] = useState('')
  const [response, setResponse] = useState({})
  const handleSendAddressChange = (e: any) => {
    setSendAddress(e.target.value)
  }

  const handleMaticFaucet = async () => {
    try {
      setError('')
      setLoading(true)
      const network = 'local'
      const uri = `/api/faucet/${network}/matic?address=${sendAddress}`
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
          <TextField
            onChange={handleSendAddressChange}
            value={sendAddress}
            label='Receiving Address'
            variant='outlined'
          />
          <ButtonGroup
            size='large'
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: '2em',
            }}
          >
            <Button variant='contained' onClick={handleFweb3Faucet}>
              Fweb3
            </Button>
            <Button variant='contained' onClick={handleMaticFaucet}>
              MATIC
            </Button>
          </ButtonGroup>
          {response && <Typography>{JSON.stringify(response)}</Typography>}
          {error && <Typography>{error}</Typography>}
        </Paper>
      </Box>
    </>
  )
}
