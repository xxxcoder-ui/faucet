import { BigNumber } from 'ethers'
import { IEthersInterfaces, IGasFees } from './types'

export const canAffordToDripMatic = async ({
  contract,
}: IEthersInterfaces): Promise<boolean> => {
  console.log('can afford matic drip?')
  const estimate: BigNumber = await contract.estimateGas.dripEth(contract.address)
  console.log(`gas estimate: ${estimate.toString()}`)
  const currentBalance: BigNumber = await contract.getBalance()
  console.log(`current matic faucet contract [${contract.address}] balance: ${currentBalance.toString()}`)
  const canAfford = currentBalance.sub(estimate).gt(0)
  console.log(`faucet can afford [${canAfford}]`)
  return canAfford
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
