import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'

interface ITextProps {
  text: string
}

export const LargeText = ({ text }: ITextProps): JSX.Element => {
  const theme = useTheme()

  const style = {
    margin: theme.spacing(3),
    color: 'white',
  }
  return (
    <Typography
      variant='h3'
      m={theme.spacing(3)}
      color='white'
    >
      {text}
    </Typography>
  )
}
