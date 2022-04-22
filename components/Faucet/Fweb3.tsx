import { FaucetButton } from './FaucetButton'
import { IFaucetButtonProps } from './types'
import { IPermissionsState, usePermissions } from '../../hooks'

export const Fweb3Button = ({
  handleSubmit,
}: IFaucetButtonProps): JSX.Element => {
  const { canUseFweb3Faucet }: IPermissionsState = usePermissions()

  const tooltip = canUseFweb3Faucet
    ? 'Get some FWEB3'
    : 'You dont meet the requirements for the faucet'

  return (
    <FaucetButton
      disabled={!canUseFweb3Faucet}
      handler={() => handleSubmit('fweb3')}
      tooltip={tooltip}
      text='Fweb3'
    />
  )
}
