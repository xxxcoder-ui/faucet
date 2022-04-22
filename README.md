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

1. Clone the [contracts repo](https://github.com/fweb3/contracts)
2. Follow the readme to setup local contracts to use with this app
3. Make sure you copy over your deployed addresses into `./constants.js`
4. Run the faucet with `yarn dev`


TODO:
- add local dev for FE
- add captcha
- add user data to account when faucet is used to cut down on api requests
- add tests
- match game styles
- admin panel
