import { yellow } from '@mui/material/colors'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

interface ILoadingProps {
  isLoading: boolean
  loadingMessage: string
}

export const LoadingOverlay = ({ isLoading, loadingMessage }: ILoadingProps): JSX.Element => {
  return (
    <Backdrop sx={{ zIndex: 10000 }} open={isLoading}>
      <Container
        disableGutters
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={100} />
        <Typography variant='h4' sx={{ marginTop: 8, color: yellow[300] }}>
          {loadingMessage}
        </Typography>
      </Container>
    </Backdrop>
  )
}
