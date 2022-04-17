import { Button, ButtonGroup, TextField, Typography } from '@mui/material'
import {useState} from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export const FaucetForm = () => {
  const [sendAddress, setSendAddress] = useState(
    '0x427b534A1678b1d21bd65cbeFd06aD51533418Be'
  )
  const [response, setResponse] = useState()
  const handleSendAddressChange = (e: any) => {
    setSendAddress(e.target.value)
  }

  const handleMaticFaucet = async () => {
    try {
      const network = 'local'
      const uri = `/api/faucet/${network}/matic?address=${sendAddress}`
      const res = await fetch(uri)
      const json = await res.json()
      setResponse(json)
    } catch (e) {
      console.error(e)
    }
  }

  const handleFweb3Faucet = async () => {

  }

  return (
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
          <Button variant='contained' onClick={handleFweb3Faucet}>Fweb3</Button>
          <Button variant='contained' onClick={handleMaticFaucet}>
            MATIC
          </Button>
        </ButtonGroup>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </Paper>
    </Box>
  )
}
