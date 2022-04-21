# Fweb3 Faucets (wip)

mumbai faucet contracts:
```json
{
  "fweb3TokenFaucet": "0x9bcEd9E02a88D4d1eA9d0101Ca2c9b296AEd385D",
  "fweb3MaticFaucet": "0x987879b1e22b01afCd239ECd2FC08ac536900A96",
  "fweb3Token": "0x3638A79a557D76AE1010505E32A2226F41D4EbDe",
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
