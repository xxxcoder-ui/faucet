import { ethers } from 'ethers'
import { getContractAddress } from './../contracts/addresses/index'
import { getProvider } from './interfaces'
import { loadAbi } from '../contracts/abi'
import Moralis from 'moralis/node'

const { MORALIS_MASTER_KEY } = process.env

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

const serverUrl = 'https://ok0n5e2gaiiy.usemoralis.com:2053/server'
const appId = '6dAJFygvXvptHXcabZwvnHvxO8JQ2wwf3dzuIDma'

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
    const playerGameState: IPlayerGameState = { ...DEFAULT_GAME_STATE }

    await Moralis.start({ serverUrl, appId, masterKey: MORALIS_MASTER_KEY })

    const provider = await getProvider(network)

    const burnAddress = getContractAddress(network, 'burnAddress')
    const fweb3TokenAddress = getContractAddress(network, 'fweb3Token')

    const fweb3TokenAbi = loadAbi('fweb3Token')

    const fweb3TokenContract = new ethers.Contract(
      fweb3TokenAddress,
      fweb3TokenAbi,
      provider
    )

    // has won game
    const trophyNftAddress = getContractAddress(network, 'fweb3Trophy')
    const { result: trophyTxs, status: nftStatus } =
      await Moralis.Web3API.account.getNFTsForContract({
        chain: 'polygon',
        address,
        token_address: trophyNftAddress,
      })

    if (trophyTxs && trophyTxs?.length !== 0) {
      playerGameState['hasWonGame'] = true
      playerGameState['trophyId'] = trophyTxs[0]?.token_id
    }

    // Has enough tokens
    const accountTokenBalance = await fweb3TokenContract.balanceOf(address)
    if (accountTokenBalance.toString() >= 1) {
      playerGameState['hasEnoughTokens'] = true
      playerGameState['tokenBalance'] = accountTokenBalance.toString()
    }

    // has used faucet(s)
    const faucets = getContractAddress(network, 'fweb3Faucets')
    const normalizedFaucets = faucets.map((f) => f.toLowerCase())
    const { result: tokenTransfers } =
      await Moralis.Web3API.account.getTokenTransfers({
        chain: 'polygon',
        address,
        from_date: '02/14/22',
        limit: 200,
      })

    tokenTransfers?.forEach((t) => {
      if (
        normalizedFaucets.includes(t.to_address?.toLowerCase()) ||
        normalizedFaucets.includes(t.from_address?.toLowerCase())
      ) {
        playerGameState['hasUsedFaucet'] = true
      }
    })

    const { result: accountTxs, total } =
      await Moralis.Web3API.account.getTransactions({
        chain: 'polygon',
        address,
        from_date: '02/14/22',
      })
    accountTxs?.forEach((tx) => {
      if (
        normalizedFaucets.includes(tx.to_address?.toLowerCase()) ||
        normalizedFaucets.includes(tx.from_address?.toLowerCase())
      ) {
        playerGameState['hasUsedFaucet'] = true
      }
    })

    // has transferred tokens
    tokenTransfers?.forEach((t) => {
      if (t.address?.toLowerCase() === fweb3TokenAddress?.toLowerCase()) {
        playerGameState['hasSentTokens'] = true
      }
    })
    // has burned tokens
    tokenTransfers?.forEach((t) => {
      if (t.to_address?.toLowerCase() === burnAddress?.toLowerCase()) {
        playerGameState['hasBurnedTokens'] = true
      }
    })
    // has deployed contract
    playerGameState['hasDeployedContract'] =
      (accountTxs?.filter((tx) => !tx.to_address) || []).length >= 1

    // has voted in poll
    const fweb3PollAddress = getContractAddress(network, 'fweb3Poll')
    playerGameState['hasVotedInPoll'] =
      (
        accountTxs?.filter(
          (tx) =>
            tx.to_address?.toLowerCase() === fweb3PollAddress?.toLowerCase()
        ) || []
      ).length >= 1

    // has minted nft
    accountTxs?.forEach((tx) => {
      if (!tx.to_address) {
        playerGameState['hasMintedNFT'] = true
      }
    })

    // has swapped tokens
    const swapAddress = getContractAddress(network, 'swapAddress')
    accountTxs?.forEach((tx) => {
      if (tx.to_address?.toLowerCase() === swapAddress?.toLowerCase()) {
        playerGameState['hasSwappedTokens'] = true
      }
    })
    return playerGameState
  } catch (err) {
    console.error(err)
  }
}
