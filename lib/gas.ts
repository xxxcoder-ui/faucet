import { BigNumber } from 'ethers'
import { IEthersInterfaces, IGasFees } from './types'

export const canAffordToDripMatic = async ({
  contract,
  wallet,
}: IEthersInterfaces): Promise<boolean> => {
  const estimate: BigNumber = await contract.estimateGas.dripEth(wallet.address)
  const currentBalance: BigNumber = await wallet.getBalance()
  return currentBalance.sub(estimate).gt(0)
}

export const gasInfo = async ({ provider }: IEthersInterfaces) => {
  const { maxFeePerGas, maxPriorityFeePerGas, gasPrice } =
    await provider.getFeeData()
  const info: IGasFees = {
    maxFeePerGas: maxFeePerGas?.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas?.toString(),
    gasPrice: gasPrice?.toString(),
  }
  console.log({ gasInfo: info })
  return info
}
