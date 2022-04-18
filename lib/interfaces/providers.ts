import { ethers } from 'ethers'
import { IInterfaceConfig } from '../types'

export const createProvider = ({
  network,
}: IInterfaceConfig):
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider => {
  if (network !== 'local') {
    return _createInfuraProvider(network)
  } else {
    return _createLocalProvider()
  }
}

const _createLocalProvider = (): ethers.providers.JsonRpcProvider => {
  const provider = new ethers.providers.JsonRpcProvider()
  return provider
}

const _createInfuraProvider = (network: string) => {
  const netName = network === 'polygon' ? 'matic' : 'maticmum'
  const provider = new ethers.providers.InfuraProvider(netName, {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  })
  return provider
}
