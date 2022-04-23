import fs from 'fs-extra'

const _backup = (network: string) => {
  const now = Date.now()
  const addressPath = `contracts/addresses/${network}.json`
  const abiPath = `contracts/abi/`
  fs.copySync(`${addressPath}`, `backups/${network}/${network}_${now}.json`)
  fs.copySync(`${abiPath}`, `backups/abi/${now}`)
}

const syncAndWrite = (network: string): void => {
  try {
    const addresses: any = {}
    const addressesPath = `../fweb3-contracts/deploy_addresses/${network}`
    const jsonPath = `contracts/addresses/${network}.json`
    const addressFile = fs.readdirSync(addressesPath)

    for (const filename of addressFile) {
      const camelFilename: string = filename.replace(
        /_([a-z])/g,
        (f) => `${f[1].toUpperCase()}`
      )
      const address = fs.readFileSync(`${addressesPath}/${filename}`, 'utf-8')
      addresses[camelFilename] = address.trim()
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
  _backup(network)
  syncAndWrite(network)
})()
