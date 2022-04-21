# Fweb3 Faucets (wip)

mumbai faucet contracts:
```json
{
  "fweb3TokenFaucet": "0x804A8A7bA5Cf56AaeEa3aca2aAD31b0E5b2ff4f8",
  "fweb3MaticFaucet": "0xe567777504e3D517E6B4987D6c318e657f2207Fe",
  "fweb3Token": "0xd23E658C2E876eFae86dA5b258aA096c09255d91",
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
