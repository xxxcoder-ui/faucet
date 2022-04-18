import { getContractAddresses } from './../contracts/addresses/index';
import { IEthersInterfaces } from './types'
import { ethers } from 'ethers'

export const getLocalFaucetBalance = async ({
  provider,
}: IEthersInterfaces) => {
  const balance = await provider.getBalance(
    getContractAddresses('local', ['fweb3EthFaucet'])
  )
  return balance.toString()
}

export const depositLocalMatic = async ({
  wallet,
}: IEthersInterfaces): Promise<ethers.providers.TransactionReceipt> => {
  const tx: ethers.providers.TransactionResponse = await wallet.sendTransaction(
    {
      to: getContractAddresses('local', ['fweb3EthFaucet']),
      value: ethers.utils.parseEther('1'),
    }
  )
  const receipt = await tx.wait()
  return receipt
}
