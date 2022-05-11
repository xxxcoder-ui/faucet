export const MIN_REQUIRED_FWEB3_FOR_MATIC = 300

export enum NETWORKS {
  MUMBAI = 'mumbai',
  LOCAL = 'localhost',
  POLYGON = 'polygon',
}

export const ALLOWED_NETWORKS: IMap = {
  80001: NETWORKS.MUMBAI,
  137: NETWORKS.POLYGON,
  1337: NETWORKS.LOCAL,
}
