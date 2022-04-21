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
  handleSubmit
}: IFaucetButtonProps): JSX.Element => {
  const { canUseMaticFaucet }: IPermissionsState = usePermissions()
  const tooltip = canUseMaticFaucet
    ? 'Get some MATIC'
    : 'You dont meet the requirements for the faucet'

  return (
    <FaucetButton
      text='MATIC'
      disabled={!canUseMaticFaucet}
      handler={handleSubmit}
      tooltip={tooltip}
    />
  )
}
