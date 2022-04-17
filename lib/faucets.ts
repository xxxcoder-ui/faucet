import { IEthersInterfaces } from './types'
import { canAffordToDripMatic } from './gas'

export const dripMatic = async (interfaces: IEthersInterfaces) => {
  const canAfford = await canAffordToDripMatic(interfaces)
  const contractHasFunds = await _faucetHasFunds(interfaces)
  if (!canAfford) {
    throw new Error('Owner cant afford gas')
  }
  if (!contractHasFunds) {
    throw new Error('Faucet is dry')
  }
  const tx = await _dripEth(interfaces)
  console.log({ drip_tx: tx })
  return tx
}

const _faucetHasFunds = async ({
  provider,
  faucetAddress,
}: IEthersInterfaces): Promise<boolean> => {
  const faucetBalance = await provider.getBalance(faucetAddress)
  console.log({ faucetBalance: faucetBalance.toString() })
  return faucetBalance.gt(0)
}

const _dripEth = async ({ contract, recipient }: IEthersInterfaces) => {
  const tx = await contract.dripEth(recipient)
  const receipt = await tx.wait()
  return receipt
}
