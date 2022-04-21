import fs from 'fs-extra'

const syncAndWrite = (addressesPath: string, jsonPath: string): void => {
  try {
    const addresses: any = {
      fweb3AdminNft: '',
      fweb3DiamondNft: '',
      fweb3TokenFaucet: '',
      fweb3MaticFaucet: '',
      fweb3Game: '',
      fweb3Poll: '',
      fweb3Token: '',
      fweb3Trophy: ''
    }
    const addressFile = fs.readdirSync(addressesPath)

    for (const filename of addressFile) {
      const camelFilename: string = filename.replace(
        /_([a-z])/g,
        (f) => `${f[1].toUpperCase()}`
      )
      const address = fs.readFileSync(`${addressesPath}/${filename}`, 'utf-8')
      addresses[camelFilename] = address
    }
    fs.writeFileSync(jsonPath, JSON.stringify(addresses))
    console.log('synced local')
    console.log({ addresses })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}


;(() => {
  const network = process.argv[2]
  const addressPath = `../fweb3-contracts/deploy_addresses/${network}`
  const jsonPath = `contracts/addresses/${network}.json`
  syncAndWrite(addressPath, jsonPath)
})()
