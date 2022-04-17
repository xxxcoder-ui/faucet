import { IEthersInterfaces } from "./types";
import { LOCAL_MATIC_FAUCET_ADDRESS } from "../constants";
import { ethers } from "ethers";

export const getLocalFaucetBalance = async ({ provider }: IEthersInterfaces) => {
  const balance = await provider.getBalance(LOCAL_MATIC_FAUCET_ADDRESS)
  return balance.toString()
}

export const depositLocalMatic = async ({ wallet }: IEthersInterfaces) => {
  const tx = await wallet.sendTransaction({
    to: LOCAL_MATIC_FAUCET_ADDRESS,
    value: ethers.utils.parseEther('1')
  })
  const receipt = await tx.wait()
  console.log({ deposit_receipt: receipt })
  return receipt
}
