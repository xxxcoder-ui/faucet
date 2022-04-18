export const MIN_REQUIRED_FWEB3_FOR_MATIC = 300

export enum NETWORKS {
  MUMBAI = 'mumbai',
  LOCAL = 'local',
  POLYGON = 'polygon',
}

export const ALLOWED_NETWORKS_MAP: IMap = {
  '0x13881': NETWORKS.MUMBAI,
  '0x89': NETWORKS.POLYGON,
  '0x539': NETWORKS.LOCAL,
}

// ex: /api/<action>/<network/<type>
// /api/faucet/mumbai/matic
// must match an abi name in ./contracts/abi
export const CONTRACT_ACTION_MAP: any = {
  faucet: {
    matic: 'fweb3EthFaucet',
    fweb3: 'fweb3Erc20Faucet',
  },
}

export const MORALIS_SERVER_URL =
  'https://zvb1yx1rcsso.usemoralis.com:2053/server'
export const MORALIS_APP_ID = 'WBl6lPViVLi8Epz1vZG6vhVWsBem5YCCMk9zgouo'
