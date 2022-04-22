import { ethers } from "ethers"
const { LOCAL_PRIVK, MUMBAI_PRIVK, POLYGON_PRIVK } = process.env

type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider

export const getProvider = (network: string): Provider => {
  if (network !== 'local') {
    const netName = network === 'polygon' ? 'polygon' : 'maticmum'
    console.log(`infura provider: ${netName}`)
    return new ethers.providers.InfuraProvider(netName, {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    })
  }
  return new ethers.providers.JsonRpcProvider('http://localhost:8545')
}


export const getPrivk = (network: string) => {
  if (network === 'polygon') {
    console.log('using polygon wallet')
    return POLYGON_PRIVK
  } else if (network === 'mumbai') {
    console.log('using mumbai wallet')
    return MUMBAI_PRIVK
  } else {
    console.log('using local wallet')
    return LOCAL_PRIVK
  }
}
