import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { IButtonProps } from './types'
import { Typography, useTheme } from '@mui/material'
import { blue } from '@mui/material/colors'
export const FaucetButton = ({
  tooltip,
  disabled,
  handler,
  text,
}: IButtonProps): JSX.Element => {
  const theme = useTheme()

  const style = {
    padding: theme.spacing(5),
    color: theme.palette.secondary.light,
    background: '#000000',
  }
  return (
    <Tooltip title={tooltip} arrow>
      <div>
        <Button
          size='large'
          disabled={disabled}
          variant='contained'
          onClick={handler}
          sx={style}
        >
          <Typography variant='h3'>{text}</Typography>
        </Button>
      </div>
    </Tooltip>
  )
}
