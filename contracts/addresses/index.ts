import * as LOCAL_ADDRESSES from './local.json'
import * as MUMBAI_ADDRESSES from './mumbai.json'
import * as POLYGON_ADDRESSES from './polygon.json'

const CONTRACT_MAP: any = {
  local: LOCAL_ADDRESSES,
  mumbai: MUMBAI_ADDRESSES,
  polygon: POLYGON_ADDRESSES,
}

export const getContractAddress = (network: string, name: string) => {
  return CONTRACT_MAP[network][name]
}
