export interface IFaucetButtonProps {
  handleSubmit: (type: string) => void
}

export interface IButtonProps {
  tooltip: string
  disabled: boolean
  handler: () => void
  text: string
}
