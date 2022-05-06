import { ethers } from 'ethers'
import { getContractAddress } from './../contracts/addresses/index'
import { getProvider } from './interfaces'
import { loadAbi } from '../contracts/abi'


interface IPlayerGameState {
  walletConnected?: boolean
  hasUsedFaucet?: boolean
  hasUsedFweb3Faucet?: boolean
  hasUsedMaticFaucet?: boolean
  hasSentTokens?: boolean
  hasBurnedTokens?: boolean
  tokenBalance?: string
  hasEnoughTokens?: boolean
  hasDeployedContract?: boolean
  hasMintedNFT?: boolean
  hasSwappedTokens?: boolean
  hasVotedInPoll?: boolean
  hasWonGame?: boolean
  trophyId?: string
}

const serverUrl = ''
const appId = ''

const DEFAULT_GAME_STATE: IPlayerGameState = {
  walletConnected: false, //
  hasUsedFaucet: false, //
  hasUsedFweb3Faucet: false, //
  hasUsedMaticFaucet: false, //
  hasSentTokens: false, //
  hasBurnedTokens: false, //
  tokenBalance: '', //
  hasEnoughTokens: false, //
  hasDeployedContract: false, //
  hasMintedNFT: false, //
  hasSwappedTokens: false, //
  hasVotedInPoll: false, //
  hasWonGame: false, //
  trophyId: '', //
}

export const fetchAccountGameState = async (
  network: string,
  address: string
) => {
  try {

  } catch (err) {
    console.error(err)
  }
}
