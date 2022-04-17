import { IEthersInterfaces } from './types'

export const canAffordToDripMatic = async ({
  contract,
  wallet,
}: IEthersInterfaces): Promise<boolean> => {
  const estimate = await contract.estimateGas.dripEth(wallet.address)
  const currentBalance = await wallet.getBalance()
  return currentBalance.sub(estimate).gt(0)
}

export const gasInfo = async ({provider}: IEthersInterfaces) => {
  const { maxFeePerGas, maxPriorityFeePerGas, gasPrice } =
    await provider.getFeeData()
  const info = {
    maxFeePerGas: maxFeePerGas?.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas?.toString(),
    gasPrice: gasPrice?.toString(),
  }
  console.log({ gasInfo: info })
  return info
}
