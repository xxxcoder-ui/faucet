import { BigNumber, ethers } from 'ethers'
import { getGasPrices } from './gas'
import type { Provider } from './interfaces'

const { GAS_LIMIT = 200000000000 } = process.env

const _isNotValidPrice = (price: number) =>
  !price || price === 0 || price > parseInt(GAS_LIMIT.toString())

export const attemptTransaction = async (
  provider: Provider,
  contractFunction: any,
  address: string
) => {
  const prices = await getGasPrices(provider)
  const gasLimitGwei = ethers.utils.parseUnits(GAS_LIMIT?.toString(), 'gwei')
  console.log(`[+] Gas limit set to: [${gasLimitGwei}]`)
  for (let price of prices) {
    try {
      console.log(`[+] Trying gas price [${price}]`)

      if (_isNotValidPrice(price)) {
        throw new Error('Gas is unpredictable. Try again later.')
      }

      const tx = await contractFunction(address, {
        gasPrice: price, // setting a gasLimit has problems
      })

      return tx.wait()
    } catch (err: any) {
      console.error(err?.reason)
      const gasReason = _isGasError(err)
      if (gasReason) {
        continue
      } else {
        throw new Error('Gas is unpredictable. Try again later.')
      }
    }
  }
}

const _isGasError = (err: any): boolean => {
  const cannotEstimate = err.message.includes('cannot estimate gas')
  const tooLittleGas = err.message.includes(
    'max fee per gas less than block base'
  )
  return cannotEstimate || tooLittleGas
}
