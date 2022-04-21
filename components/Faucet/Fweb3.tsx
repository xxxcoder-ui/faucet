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

export const Fweb3Button = ({
  setError,
  setLoading,
  setScannerUrl,
  setTransaction,
}: IFaucetButtonProps): JSX.Element => {
  const { canUseFweb3Faucet }: IPermissionsState = usePermissions()
  const { chainId, account }: MoralisContextValue = useMoralis()
  const { apiRoute }: INetworkState = useNetwork()

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

  const tooltip = canUseFweb3Faucet
    ? 'Get some FWEB3'
    : 'You dont meet the requirements for the faucet'

  return (
    <FaucetButton
      disabled={!canUseFweb3Faucet}
      handler={handleFaucetSubmit}
      tooltip={tooltip}
      text='Fweb3'
    />
  )
}
