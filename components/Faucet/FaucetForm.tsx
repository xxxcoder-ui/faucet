import { LoadingOverlay } from '../LoadingOverlay'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { ALLOWED_NETWORKS_MAP, NETWORKS } from '../../constants'
import { Fweb3Button } from './Fweb3'
import { MaticButton } from './Matic'
import Link from 'next/link'
import { Container, useTheme } from '@mui/material'
import { green } from '@mui/material/colors'
import { LargeText } from '../shared/LargeText'

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
  const theme = useTheme()

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
    },
    buttonContainer: {},
    form: {
      padding: theme.spacing(3),
      margin: theme.spacing(5),
    },
    display: 'flex',
    margin: theme.spacing(2),
    alignItems: 'center',
  }
  return (
    <>
      <LoadingOverlay
        isLoading={loading}
        loadingMessage='Sending Transaction...'
      />
      <Box sx={styles.container}>
        <Paper elevation={24} sx={styles.form}>
          <LargeText text='Fweb3 Faucet (beta)' />
          {transaction ? (
            <Typography variant='h4'>Success!</Typography>
          ) : (
            <Box
              m={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
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
            </Box>
          )}
          {transaction && (
            <>
              <Typography>Transaction Hash</Typography>
              <Typography>{transaction}</Typography>
              {scannerUrl && (
                <Link href={scannerUrl} passHref>
                  <Typography variant='body1' sx={{ color: green[500] }}>
                    View on polygonscan
                  </Typography>
                </Link>
              )}
            </>
          )}
          {error && <Typography>{JSON.stringify(error, null, 2)}</Typography>}
        </Paper>
      </Box>
    </>
  )
}
