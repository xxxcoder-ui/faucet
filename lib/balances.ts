import { getContractAddresses } from './../contracts/addresses/index'
import { NextApiRequest } from 'next'
import { ethers } from 'ethers'
import fweb3TokenABI from '../contracts/abi/fweb3Token.json'
import fweb3EthFaucetABI from '../contracts/abi/fweb3EthFaucet.json'

export const getFaucetbalances = async (req: NextApiRequest) => {
  const { network } = req.query
  if (!network) {
    throw new Error('missing query params')
  }
  const { fweb3Erc20Faucet, fweb3EthFaucet, fweb3Token } = getContractAddresses(
    network.toString(),
    ['fweb3Erc20Faucet', 'fweb3EthFaucet', 'fweb3Token']
  )
  const provider = await new ethers.providers.JsonRpcProvider(
    'http://localhost:8545'
  )
  const signer = await provider.getSigner()

  const fweb3Balance = await fweb3FaucetBalance(
    network.toString(),
    signer,
    fweb3Erc20Faucet
  )
  const maticBalance = await maticFaucetBalance(network.toString(), provider)
  return {
    fweb3: {
      faucet_address: fweb3Erc20Faucet || 'cant find contract',
      faucet_balance: fweb3Balance.toString(),
      token_address: fweb3Token,
    },
    matic: {
      faucet_address: fweb3EthFaucet,
      balance: maticBalance.toString(),
    },
  }
}

const maticFaucetBalance = async (
  network: string,
  provider: ethers.providers.JsonRpcProvider | ethers.providers.InfuraProvider
) => {
  const maticFaucetAddress = getContractAddresses(network, ['fweb3EthFaucet'])
  const bal = await provider.getBalance(maticFaucetAddress)
  return bal
}

const fweb3FaucetBalance = async (
  network: string,
  signer: ethers.providers.JsonRpcSigner | ethers.providers.InfuraProvider,
  balanceOfAddress: string
) => {
  const fweb3TokenAddress = getContractAddresses(network, ['fweb3Token'])
  const fweb3TokenContract: ethers.Contract = new ethers.Contract(
    fweb3TokenAddress,
    fweb3TokenABI.abi,
    signer
  )
  const bal = await fweb3TokenContract.balanceOf(balanceOfAddress)
  return bal
}

// const _fweb3FaucetHasFunds = async (
//   interfaces: IEthersInterfaces
// ): Promise<boolean> => {
//   try {
//     const erc20FaucetAddress = getContractAddresses(interfaces.network, [
//       'fweb3Token',
//     ])
//     const abi: any = fweb3Token?.abi || '' // FIXME: !string types? wtf
//     const erc20TokenContract: ethers.Contract = await loadReadOnlyContract(
//       erc20FaucetAddress,
//       abi,
//       interfaces.provider
//     )
//     const balance: BigNumber = await erc20TokenContract.balanceOf(
//       interfaces.contract.address
//     )
//     console.log({ fweb3Balance: balance.toString() })
//     const minAmount: BigNumber = BigNumber.from(ethers.utils.parseEther('300'))
//     return balance.gt(minAmount)
//   } catch (e: any) {
//     console.error(e.message)
//     return false
//   }
// }
