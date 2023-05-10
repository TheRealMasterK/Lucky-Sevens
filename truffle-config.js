const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = "<your-infura-project-id>";
const mnemonic = "<your-mnemonic>";

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
  },
  compilers: {
    solc: {
      version: '0.8.1', // Use the same Solidity version as your contract
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
