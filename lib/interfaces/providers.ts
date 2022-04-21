import { IFaucetRequest } from './../types'
import { ethers } from 'ethers'
import { Provider } from '../types'

export const createProvider = ({ network }: IFaucetRequest): Provider => {
  if (network !== 'local') {
    return _createInfuraProvider(network)
  } else {
    return _createLocalProvider()
  }
}

const _createLocalProvider = (): Provider => {
  console.log('creating local rpc provider')
  const provider = new ethers.providers.JsonRpcProvider()
  return provider
}

const _createInfuraProvider = (network: string): Provider => {
  const netName = network === 'polygon' ? 'matic' : 'maticmum'
  console.log(`creating infura provider on ${netName}`)
  const provider = new ethers.providers.InfuraProvider(netName, {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  })
  return provider
}
