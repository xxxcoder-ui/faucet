import { AlchemyProvider } from "@ethersproject/providers"
import { ethers } from "ethers"
const { LOCAL_PRIVK, MUMBAI_PRIVK, POLYGON_PRIVK } = process.env

type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider
  | ethers.providers.BaseProvider

export const getProvider = (network: string): Provider => {
  if (network !== 'local') {
    const netName = network === 'polygon' ? 'matic' : 'maticmum'
    console.log(`provider: ${netName}`)
    // const provider = ethers.providers.getDefaultProvider(netName, {
    //   infura: {
    //     projectId: process.env.INFURA_PROJECT_ID,
    //     projectSecret: process.env.INFURA_PROJECT_SECRET,
    //   },
    //   alchemy: process.env.ALCHEMY_API_KEY
    // })
    // const provider = ethers.providers.getDefaultProvider(netName, {
    //   alchemy: process.env.ALCHEMY_API_KEY,
    // })
    const provider = new AlchemyProvider(netName, process.env.ALCHEMY_API_KEY)
    return provider
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
