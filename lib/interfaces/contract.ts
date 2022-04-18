import { IInterfaceConfig } from './../types'
import { ethers } from 'ethers'
import { CONTRACT_ACTION_MAP } from '../../constants'
import { getContractAddresses } from '../../contracts/addresses'
import erc20FaucetJson from '../../contracts/abi/fweb3ERC20Faucet.json'
import ethFaucetJson from '../../contracts/abi/fweb3EthFaucet.json'
// import fweb3Token from '../../contracts/abi/fweb3Token.json'

const ABI_MAP: any = {
  matic: ethFaucetJson,
  fweb3: erc20FaucetJson,
}

export const createContract = async (
  wallet: ethers.Wallet,
  { network, type, action }: IInterfaceConfig
): Promise<ethers.Contract> => {
  const contractName: string = _getContractName(type, action)
  const contractAddress: string = getContractAddresses(network, [contractName])
  const contract: ethers.Contract = new ethers.Contract(
    contractAddress,
    ABI_MAP[type].abi,
    wallet
  )
  return contract
}

const _getContractName = (type: string, action: string): string => {
  return CONTRACT_ACTION_MAP[action][type] || ''
}
