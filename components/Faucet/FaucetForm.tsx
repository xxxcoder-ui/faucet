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
import { green, red } from '@mui/material/colors'
import { LargeText } from '../shared/LargeText'
import ReCAPTCHA from 'react-google-recaptcha'
import { MoralisContextValue, useMoralis } from 'react-moralis'
import { INetworkState, useNetwork } from '../../hooks'

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
  const { chainId, account }: MoralisContextValue = useMoralis()
  const [startCapatcha, setStartCapatcha] = useState<boolean>(false)
  const { apiRoute }: INetworkState = useNetwork()
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

  const handleCapatcha = async (token: string | null) => {
    if (token) {
      setStartCapatcha(false)
      await handleFaucetSubmit()
      return
    }
    setStartCapatcha(false)
    setError('Failed capatcha')
  }

  const showCapatcha = () => {
    console.log('show capatcha')
    setStartCapatcha(true)
  }

  const handleFaucetSubmit = async (): Promise<void> => {
    try {
      setError('')
      setLoading(true)
      const uri = `/api/faucet?network=${apiRoute}&type=fweb3&account=${account}`
      const faucetResponse: Response = await fetch(uri)
      const { error, transactionHash } = await faucetResponse.json()

      if (error) {
        setError(error)
      } else if (!transactionHash) {
        setError(
          'No tx receipt was received. Please check your wallet for confirmation'
        )
      } else {
        setTransaction(transactionHash)
        setScannerUrl(createScannerUrl(chainId || '', transactionHash))
      }
      setLoading(false)
    } catch (e: any) {
      console.error({ e })
      setError(e?.message)
      setLoading(false)
    }
  }
  return (
    <>
      <LoadingOverlay
        isLoading={loading}
        loadingMessage='Sending Transaction...'
      />
      <Box sx={styles.container}>
        {startCapatcha ? (
          <Container
            sx={
              {
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
              }
            }
          >
            <ReCAPTCHA
              sitekey='6Ld13o4fAAAAAMByXu-GE5J34kq_hoUDZRd9tMFy'
              onChange={handleCapatcha}
            />
          </Container>
        ) : (
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
                {error ? null : (
                  <>
                    <Fweb3Button handleSubmit={showCapatcha} />
                    <MaticButton handleSubmit={showCapatcha} />
                  </>
                )}
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
            {error && (
              <Typography variant='body1' sx={{ color: red[300] }}>
                {error}
              </Typography>
            )}
          </Paper>
        )}
      </Box>
    </>
  )
}
