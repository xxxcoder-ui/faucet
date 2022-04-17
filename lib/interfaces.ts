import { MUMBAI_ERC20_FAUCET_ADDRESS, MUMBAI_ERC20_TOKEN_ADDRESS } from './../constants';
import { ethers } from 'ethers'
import {
  POLYGON_MATIC_FAUCET_ADDRESS,
  MUMBAI_MATIC_FAUCET_ADDRESS,
  LOCAL_MATIC_FAUCET_ADDRESS,
  LOCAL_ERC20_FAUCET_ADDRESS,
  LOCAL_ERC20_TOKEN_ADDRESS,

} from '../constants'
import { NextApiRequestQuery } from 'next/dist/server/api-utils'
import maticFaucetInterface from '../abi/EthFaucet.json'
import { IEthersInterfaces } from './types'

export const createLocalInterfaces = async ({
  address,
}: NextApiRequestQuery): Promise<IEthersInterfaces> => {
  const recipient = _validAddress(address)
  const provider = _createLocalProvider()
  const wallet = await _createLocalWallet(provider)
  const contract = await _createLocalFaucetContract(wallet)
  return {
    faucetAddress: LOCAL_MATIC_FAUCET_ADDRESS,
    recipient,
    provider,
    wallet,
    contract,
  }
}

export const createMumbaiInterfaces = async ({
  address,
}: NextApiRequestQuery): Promise<IEthersInterfaces> => {
  const recipient = _validAddress(address)
  const provider = _createMumbaiProvider()
  const wallet = await _createMumbaiWallet(provider)
  const contract = await _createMumbaiFaucetContract(wallet)
  return {
    faucetAddress: MUMBAI_MATIC_FAUCET_ADDRESS,
    recipient,
    provider,
    wallet,
    contract,
  }
}

export const createPolygonInterfaces = async ({
  address,
}: NextApiRequestQuery): Promise<IEthersInterfaces> => {
  const recipient = _validAddress(address)
  const provider = _createPolygonProvider()
  const wallet = await _createPolygonWallet(provider)
  const contract = await _createPolygonFaucetContract(wallet)
  return {
    faucetAddress: MUMBAI_MATIC_FAUCET_ADDRESS,
    recipient,
    provider,
    wallet,
    contract,
  }
}

const _createLocalProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider()
  return provider
}

const _createLocalWallet = async (provider: any) => {
  const wallet = new ethers.Wallet(process.env.LOCAL_PRIVK || '', provider)
  return wallet
}

const _createLocalFaucetContract = async (wallet: any) => {
  const contract = new ethers.Contract(
    LOCAL_MATIC_FAUCET_ADDRESS,
    maticFaucetInterface.abi,
    wallet
  )
  return contract
}

const _createMumbaiProvider = () => {
  const provider = new ethers.providers.InfuraProvider('maticmum', {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  })
  return provider
}

const _createMumbaiWallet = async (provider: any) => {
  const wallet = new ethers.Wallet(
    process.env.MUMBAI_MATIC_PRIVK || '',
    provider
  )
  return wallet
}

const _createMumbaiFaucetContract = async (wallet: any) => {
  const contract = new ethers.Contract(
    MUMBAI_MATIC_FAUCET_ADDRESS,
    maticFaucetInterface.abi,
    wallet
  )
  return contract
}


const _createPolygonProvider = () => {
  const provider = new ethers.providers.InfuraProvider('matic', {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  })
  return provider
}

const _createPolygonWallet = async (provider: any) => {
  const wallet = new ethers.Wallet(
    process.env.POLYGON_MATIC_PRIVK || '',
    provider
  )
  return wallet
}

const _createPolygonFaucetContract = async (wallet: any) => {
  const contract = new ethers.Contract(
    POLYGON_MATIC_FAUCET_ADDRESS,
    maticFaucetInterface.abi,
    wallet
  )
  return contract
}

const _validAddress = (address: string | string[]): string => {
  if (Array.isArray(address)) {
    return address[0]
  }
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return address
  }
  throw new Error('Address is invalid')
}
