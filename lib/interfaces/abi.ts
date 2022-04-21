import erc20FaucetJson from '../../contracts/abi/fweb3ERC20Faucet.json'
import ethFaucetJson from '../../contracts/abi/fweb3EthFaucet.json'
import fweb3Token from '../../contracts/abi/fweb3Token.json'

export const ABI_MAP: any = {
  matic: ethFaucetJson,
  fweb3: erc20FaucetJson,
  fweb3Token: fweb3Token,
}
