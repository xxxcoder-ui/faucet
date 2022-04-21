import { getContractAddresses } from './../contracts/addresses/index'
import { NextApiRequest } from 'next'
import {
  createFaucetInterfaces,
  getFaucetContractName,
  loadReadOnlyContract,
} from './interfaces'
import { BigNumber, ethers } from 'ethers'
import { canAffordToDripMatic } from './gas'
import { IEthersInterfaces, IFaucetRequest } from './types'
import fweb3Token from '../contracts/abi/fweb3Token.json'

export const dripFunds = async (req: NextApiRequest) => {
  const { account, type, network } = req.query as unknown as IFaucetRequest
  const faucetContractName = getFaucetContractName(type || '')
  if (type === 'fweb3') {
    return _dripFweb3({ account, type, network, faucetContractName })
  } else if (type === 'matic') {
    return _dripMatic({ account, type, network, faucetContractName })
  } else {
    throw new Error("Unknown type of faucet you'd like to drip from")
  }
}

const _dripFweb3 = async (faucetRequest: IFaucetRequest) => {
  console.log('dripping fweb3')
  const interfaces: IEthersInterfaces = await createFaucetInterfaces(faucetRequest)
  const faucetHasFunds: boolean = await _fweb3FaucetHasFunds(interfaces)
  if (!faucetHasFunds) {
    throw new Error('Faucet is dry. Please try again later.')
  }
}

const _dripMatic = async (
  faucetRequest: IFaucetRequest
): Promise<ethers.providers.TransactionReceipt> => {
  const interfaces = await createFaucetInterfaces(faucetRequest)
  // const faucetHasFunds: boolean = await canAffordToDripMatic(interfaces)
  const contractHasFunds: boolean = await _maticFaucetHasFunds(interfaces)

  // if (!faucetHasFunds) {
  //   throw new Error('Owner cant afford gas')
  // }

  if (!contractHasFunds) {
    throw new Error('Faucet is dry')
  }

  const { contract, account } = interfaces
  console.log(`dripping matic from [${contract.address}] to [${account}]`)
  const tx = await contract.dripEth(account)
  const receipt = await tx.wait()
  return receipt
}

const _maticFaucetHasFunds = async ({
  provider,
  contract,
}: IEthersInterfaces): Promise<boolean> => {
  const faucetBalance: BigNumber = await provider.getBalance(contract.address)
  console.log(`current matic faucet funds: [${faucetBalance.toString()}]`)
  return faucetBalance.gt(0)
}

const _fweb3FaucetHasFunds = async (
  interfaces: IEthersInterfaces
): Promise<boolean> => {
  try {
    console.log('checking fweb3 faucet funds')
    const erc20FaucetAddress = getContractAddresses(interfaces.network, [
      'fweb3Token',
    ])
    console.log(`faucet address for ${interfaces.network} is ${erc20FaucetAddress}`)
    const abi: any = fweb3Token?.abi || ''
    console.log(`found abi: ${!!abi}`)
    const erc20TokenContract: ethers.Contract = await loadReadOnlyContract(
      erc20FaucetAddress,
      abi,
      interfaces.provider
    )
    const balance: BigNumber = await erc20TokenContract.balanceOf(
      interfaces.contract.address
    )

    const minAmount: BigNumber = BigNumber.from(ethers.utils.parseEther('300'))
    return balance.gt(minAmount)
  } catch (e: any) {
    console.error(e.message)
    return false
  }
}
