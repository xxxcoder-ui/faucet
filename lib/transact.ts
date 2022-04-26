import { ethers } from 'ethers'
import type { Provider } from './interfaces'

const { GAS_LIMIT = 60000000000 } = process.env

export const attemptTransaction = async (
  provider: Provider,
  contractFunction: any,
  address: string
) => {
  const prices = await _createPrices(provider)
  for (let price of prices) {
    try {
      console.log(`[+] Gas limit set to: [${GAS_LIMIT?.toString()}]`)
      console.log(`[+] Trying gas price [${price?.toString()}]`)
      const gasIsMoreThanOurLimit = price?.gt(GAS_LIMIT)
      if (!price || price.isZero()) {
        throw new Error('Gas is unpredictable. Try again later.')
      }
      if (gasIsMoreThanOurLimit) {
        throw new Error('Gas costs exceed the faucets allowed maximum')
      }
      const tx = await contractFunction(address, {
        gasPrice: price, // setting a gasLimit has problems
      })
      return tx.wait()
    } catch (err: any) {
      const gasReason = _gasErrors(err)
      if (gasReason) {
        continue
      } else {
        console.error(err?.message)
        throw new Error('Gas is unpredictable. Try again later.')
      }
    }
  }
}

const _createPrices = async (provider: Provider) => {
  try {
    const gasRes = await fetch('https://gasstation-mainnet.matic.network/v2')
    const { safeLow } = await gasRes.json()
    const { maxPriorityFee: safeFee } = safeLow
    const safeFeeCeil = Math.ceil(safeFee).toString()
    const safeFeeWei = ethers.utils.parseUnits(safeFeeCeil.toString(), 'gwei')
    const priceArr = ['3', '6', '9'].map((adder) =>
      safeFeeWei.add(parseInt(adder.padEnd(9, '0')))
    )
    return priceArr
  } catch (err: any) {
    console.error(err?.message)
    const { gasPrice } = await provider.getFeeData()
    return ['3', '6', '9', '12'].map((adder) =>
      gasPrice?.add(parseInt(adder.padEnd(9, '0')))
    )
  }
}

const _gasErrors = (err: any): boolean => {
  const cannotEstimate = err.message.includes('cannot estimate gas')
  const tooLittleGas = err.message.includes(
    'max fee per gas less than block base'
  )
  return cannotEstimate || tooLittleGas
}
