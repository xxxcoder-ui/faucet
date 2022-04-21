# Fweb3 Faucets

WIP
Note: Running locally is only for the api requests. The frontend is using Moralis and not connected to the local node.
## Development

1. Clone the [contracts repo](https://github.com/fweb3/contracts)
2. Follow the readme to setup local contracts to use with this app
3. Make sure you copy over your deployed addresses into `./constants.js`
4. Run the faucet with `yarn dev`

Note: With `NEXT_PUBLIC_DISABLE_PERMISSIONS` unset or false you will need to mint yourself an FWEB3 Admin NFT from the contracts repo.

TODO:
- add fweb3 side
- add local dev for FE
- add captcha
- add user data to account when faucet is used to cut down on api requests
- add tests
- match game styles
- admin panel
