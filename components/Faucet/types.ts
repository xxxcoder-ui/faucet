export interface IFaucetButtonProps {
  setError: (message: string) => void
  setLoading: (val: boolean) => void
  setScannerUrl: (url: string) => void
  setTransaction: (tx: string) => void
}

export interface IButtonProps {
  tooltip: string
  disabled: boolean
  handler: () => void
  text: string
}
