import { IPermissionsState, usePermissions } from '../../hooks'
import { FaucetButton } from './FaucetButton'
import { IFaucetButtonProps } from './types'

export const MaticButton = ({
  handleSubmit,
}: IFaucetButtonProps): JSX.Element => {
  const { canUseMaticFaucet }: IPermissionsState = usePermissions()
  const tooltip = canUseMaticFaucet
    ? 'Get some MATIC'
    : 'You dont meet the requirements for the faucet'

  return (
    <FaucetButton
      text='MATIC'
      disabled={!canUseMaticFaucet}
      handler={() => handleSubmit('matic')}
      tooltip={tooltip}
    />
  )
}
