# WadzChain Faucet Smart Contract

This repository contains the faucet smart contract for WadzChain Testnet

## Installation

1. Install NPM Packages

```javascript
npm ci
```

2. Create a `.env` file in the root directory and use the below format for .`env` file.

## Commands:

Compile contracts

```
npx hardhat compile
```

Run the testcases

```
npx hardhat test
```

### Deployed Contracts

```
npx hardhat run scripts/0_faucet_deploy.ts --network wadztest
```
