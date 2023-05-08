const { ethers } = require("hardhat");

async function main() {
  // Deploy the contract
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy();

  console.log("Token deployed to:", token.address);

  // Run the tests
  const [deployer] = await ethers.getSigners();

  console.log("Running tests with deployer address:", deployer.address);

  await token.deployed();

  const testAccounts = await ethers.getSigners();

  await Promise.all(
    testAccounts.map(async (account) => {
      console.log(`Testing with account: ${account.address}`);
      await token.transfer(account.address, 1000);
      const balance = await token.balanceOf(account.address);
      console.log(`Account balance: ${balance.toString()}`);
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
