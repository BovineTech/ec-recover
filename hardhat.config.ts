// // Buidler
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-etherscan";
import "@tenderly/hardhat-tenderly";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "dotenv/config";

const config = {
  solidity: "0.8.19",
  settings: {
    optimizer: { enabled: false },
  },
  networks: {
    hardhat: {
      // forking: {
      //   // url: "https://rpc-testnet.wadzchain.io",
      // }
    },
  },
};

export default config;
