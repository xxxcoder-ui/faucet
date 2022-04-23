import { AlchemyProvider } from '@ethersproject/providers'
import { ethers } from 'ethers'
const { LOCAL_PRIVK, MUMBAI_PRIVK, POLYGON_PRIVK, ALCHEMY_MAINNET_API_KEY, ALCHEMY_TESTNET_API_KEY } = process.env


type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.InfuraProvider
  | ethers.providers.BaseProvider


const PROVIDER_NETS: any = {
  polygon: 137,
  mumbai: 80001,
}
// const PROVIDER_NETS: any = {
//   polygon: 'matic',
//   mumbai: 'maticmum',
// }


export const getProvider = (network: string): Provider => {
  if (network !== 'local') {
    const net = PROVIDER_NETS[network]
    const alchemyKey =
      net === 'polygon' ? ALCHEMY_MAINNET_API_KEY : ALCHEMY_TESTNET_API_KEY
    const provider = new ethers.providers.AlchemyProvider(net, alchemyKey)
    return provider
  }
  console.log(`[+] using local provider rpc provider`)
  return new ethers.providers.JsonRpcProvider('http://localhost:8545')
}

export const getPrivk = (network: string) => {
  if (network === 'polygon') {
    console.log('[+] using polygon wallet')
    return POLYGON_PRIVK
  } else if (network === 'mumbai') {
    console.log('[+] using mumbai wallet')
    return MUMBAI_PRIVK
  } else {
    console.log('[+] using local wallet')
    return LOCAL_PRIVK
  }
}
