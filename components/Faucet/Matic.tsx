import {
  INetworkState,
  IPermissionsState,
  useNetwork,
  usePermissions,
} from '../../hooks'
import { createScannerUrl } from './FaucetForm'
import { FaucetButton } from './FaucetButton'
import { IFaucetButtonProps } from './types'
import { MoralisContextValue, useMoralis } from 'react-moralis'

export const MaticButton = ({
  setError,
  setLoading,
  setScannerUrl,
  setTransaction
}: IFaucetButtonProps): JSX.Element => {
  const { canUseMaticFaucet }: IPermissionsState = usePermissions()
  const { chainId, account }: MoralisContextValue = useMoralis()
  const { apiRoute }: INetworkState = useNetwork()

  const handleFaucetSubmit = async (): Promise<void> => {
    try {
      setError('')
      setLoading(true)
      const uri = `/api/faucet/${apiRoute}/matic?address=${account}`
      const faucetResponse: Response = await fetch(uri)
      const res = await faucetResponse.json()
      console.log({ res })
      const {
        error,
        data: { transactionHash },
      } = res
      if (error) {
        setError(error)
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

  const tooltip = canUseMaticFaucet
    ? 'Get some MATIC'
    : 'You dont meet the requirements for the faucet'

  return (
    <FaucetButton
      text='MATIC'
      disabled={!canUseMaticFaucet}
      handler={handleFaucetSubmit}
      tooltip={tooltip}
    />
  )
}
