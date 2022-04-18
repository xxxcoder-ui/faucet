import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { IButtonProps } from './types'

export const FaucetButton = ({
  tooltip,
  disabled,
  handler,
  text,
}: IButtonProps): JSX.Element => {
  return (
    <Tooltip title={tooltip} arrow>
      <div>
        <Button disabled={disabled} variant='contained' onClick={handler}>
          {text}
        </Button>
      </div>
    </Tooltip>
  )
}
