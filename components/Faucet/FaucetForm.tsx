import { LoadingOverlay } from '../LoadingOverlay'
import { useState } from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ALLOWED_NETWORKS_MAP, NETWORKS } from '../../constants'
import { Fweb3Button } from './Fweb3'
import { MaticButton } from './Matic'
import Link from 'next/link'
import { Container } from '@mui/material'
import { green } from '@mui/material/colors'

export const createScannerUrl = (
  chainId: string,
  transaction: string
): string => {
  const currentNetwork = ALLOWED_NETWORKS_MAP[chainId]
  if (currentNetwork === NETWORKS.MUMBAI) {
    return `https://mumbai.polygonscan.com/tx/${transaction}`
  } else if (currentNetwork === NETWORKS.POLYGON) {
    return `https://polygonscan.com/tx/${transaction}`
  }
  return ''
}

export const FaucetForm = () => {
  const [transaction, setTransaction] = useState<string>('')
  const [scannerUrl, setScannerUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

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
            <Fweb3Button
              setError={setError}
              setLoading={setLoading}
              setScannerUrl={setScannerUrl}
              setTransaction={setTransaction}
            />
            <MaticButton
              setError={setError}
              setLoading={setLoading}
              setScannerUrl={setScannerUrl}
              setTransaction={setTransaction}
            />
          </ButtonGroup>
          {scannerUrl && (
            <Container>
              <Typography>{transaction}</Typography>
              <Link href={scannerUrl} passHref>
                <Typography variant='body1' sx={{ color: green[500] }}>
                  View on polygonscan
                </Typography>
              </Link>
            </Container>
          )}
          {error && <Typography>{error}</Typography>}
        </Paper>
      </Box>
    </>
  )
}
