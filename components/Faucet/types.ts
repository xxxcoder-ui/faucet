export interface IFaucetButtonProps {
  handleSubmit: () => void
}

export interface IButtonProps {
  tooltip: string
  disabled: boolean
  handler: () => void
  text: string
}
