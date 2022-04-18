export const parseMaticErrorReason = ({ message }: any): string => {
  const notEnoughRequiredTokens: boolean = message.includes('missing erc20')
  const faucetDisabled: boolean = message.includes('disabled')
  const faucetDry: boolean = message.includes('insufficient funds')
  const hasAlreadyUsed: boolean = message.includes('already used')
  const tooSoonForAnotherDrip: boolean = message.includes('too soon')
  if (notEnoughRequiredTokens) {
    return 'You dont have enough required erc20 tokens to use this faucet'
  }
  if (faucetDisabled) {
    return 'The faucet has been disabled'
  }
  if (faucetDry) {
    return 'The faucet is out of funds'
  }
  if (hasAlreadyUsed) {
    return 'You have already used the faucet'
  }
  if (tooSoonForAnotherDrip) {
    return 'It is too soon for another faucet request'
  }
  console.error(message)
  return 'An unknown error occured'
}
