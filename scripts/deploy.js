require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/YOUR-INFURA-PROJECT-ID",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};
