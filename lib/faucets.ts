import { BigNumber, ethers } from 'ethers'
import { canAffordToDripMatic } from './gas'
import { IEthersInterfaces } from './types'

export const dripMatic = async (
  interfaces: IEthersInterfaces
): Promise<ethers.providers.TransactionReceipt> => {
  const canAfford: boolean = await canAffordToDripMatic(interfaces)
  const contractHasFunds: boolean = await _faucetHasFunds(interfaces)
  if (!canAfford) {
    throw new Error('Owner cant afford gas')
  }
  if (!contractHasFunds) {
    throw new Error('Faucet is dry')
  }
  const receipt: ethers.providers.TransactionReceipt = await _dripMatic(
    interfaces
  )
  return receipt
}

const _faucetHasFunds = async ({
  provider,
  faucetAddress,
}: IEthersInterfaces): Promise<boolean> => {
  const faucetBalance: BigNumber = await provider.getBalance(faucetAddress)
  console.log({ faucetBalance: faucetBalance.toString() })
  return faucetBalance.gt(0)
}

const _dripMatic = async ({
  contract,
  recipient,
}: IEthersInterfaces): Promise<ethers.providers.TransactionReceipt> => {
  const tx: ethers.providers.TransactionResponse = await contract.dripEth(
    recipient
  )
  const receipt: ethers.providers.TransactionReceipt = await tx.wait()
  return receipt
}
