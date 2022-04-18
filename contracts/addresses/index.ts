import * as LOCAL_ADDRESSES from './local.json'
import * as MUMBAI_ADDRESSES from './mumbai.json'
import * as POLYGON_ADDRESSES from './polygon.json'

const CONTRACT_MAP: any = {
  local: LOCAL_ADDRESSES,
  mumbai: MUMBAI_ADDRESSES,
  polygon: POLYGON_ADDRESSES,
}

// FIXME: Correct Typings. I'm done trying to tweak this for now
export const getContractAddresses = (
  network: string,
  contractNames: string[]
): any => {
  const networkContracts = CONTRACT_MAP[network]
  if (contractNames.length === 0) {
    throw new Error(`cant find ${contractNames} for ${network}`)
  }
  if (contractNames.length === 1) {
    return networkContracts[contractNames[0]]
  }
  const contracts: any = {}
  contractNames.forEach((name) => (contracts[name] = networkContracts[name]))
  return contracts
}
