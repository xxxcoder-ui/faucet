# Fweb3 Faucets (wip)

polygon faucet contracts:
```json
{
  "fweb3Token": "0x4a14ac36667b574b08443a15093e417db909d7a3",
  "maticFaucetAddress": "0xF2d86AEe11351D4396eE2Bd663977C91eE2b0F9b",
  "fweb3FaucetAddress": "0x4B9C8d77228C2d1A9f52a18812e73940270e250d"
}
```

mumbai faucet contracts:
```json
{
  "fweb3TokenFaucet": "0x9ED210295458124de8cFE6d4398E2b805dCc8254",
  "fweb3MaticFaucet": "0x8bFb5FEbcE5Fd332d5d7c7e027dDC76ed7Cb3539",
  "fweb3Token": "0x1B22845D6ecDBbb5c6829380d06Bdb040fd18063",
}


```

## Development

- copy the `env.example` to `.env`
- Clone the [contracts repo](https://github.com/fweb3/contracts)
  - Follow the readme to setup local contracts to use with this app
  - You can run `npm run sync:local` to sync your local deployed contracts with this app if the root folder is `../<here in your path>`
- clone the [api repo](https://github.com/fweb3/api)
  - follow this instructions to setup dev for the api
- Run the faucet with `npm run dev`


TODO:
- docker / docker compose
- set fallback api
- add user data to account when faucet is used to cut down on api requests
- add tests
- match game styles / better styling
- admin panel? dune?
