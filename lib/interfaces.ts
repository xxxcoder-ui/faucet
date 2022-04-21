import { ethers } from "ethers"
const { LOCAL_PRIVK, MUMBAI_PRIVK, POLYGON_PRIVK } = process.env

type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider

export const getProvider = (network: string): Provider => {
  if (network !== 'local') {
    console.log('not local')
    const netName = network === 'polygon' ? 'matic' : 'maticmum'
    return new ethers.providers.InfuraProvider(netName, {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    })
  }
  return new ethers.providers.JsonRpcProvider('http://localhost:8545')
}


export const getPrivk = (network: string) => {
  if (network === 'polygon') {
    return POLYGON_PRIVK
  } else if (network === 'mumbai') {
    return MUMBAI_PRIVK
  } else {
    return LOCAL_PRIVK
  }
}
