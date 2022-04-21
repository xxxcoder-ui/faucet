import { ethers } from 'ethers'
import { getContractAddresses } from '../../contracts/addresses'
import { IFaucetRequest, Provider } from './../types'
import { ABI_MAP } from './abi'

export const createContract = async (
  wallet: ethers.Wallet | undefined,
  { network, type, faucetContractName }: IFaucetRequest
): Promise<ethers.Contract> => {
  console.log('interfaces > contract > createContract')
  console.log(`creating ${faucetContractName} for ${type} on ${network}`)
  const contractAddress: string = getContractAddresses(network, [
    faucetContractName || '',
  ])
  console.log(`found contract address: ${contractAddress}`)
  const faucetContract: ethers.Contract = new ethers.Contract(
    contractAddress,
    ABI_MAP[type || ''].abi,
    wallet
  )
  console.log(`created faucet contract`)
  return faucetContract
}

export const loadReadOnlyContract = (
  contractAddress: string,
  abi: string,
  provider: Provider
) => {
  console.log('interfaces > contract > loadReadOnlyContract')
  console.log(`loading readonly contract: ${contractAddress}`)
  const contract: ethers.Contract = new ethers.Contract(
    contractAddress,
    abi,
    provider.getSigner()
  )
  return contract
}

export const getFaucetContractName = (type: string) => {
  const contractName = type === 'fweb3' ? 'fweb3Erc20Faucet' : 'fweb3EthFaucet'
  console.log(`using faucet contract name: ${contractName}`)
  return contractName
}
