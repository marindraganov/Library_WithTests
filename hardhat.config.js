require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("deploy-testnets", "Deploys contract on a provided network")
    .setAction(async () => {
        const libraryContract = require("./scripts/deploy");
        await libraryContract();
});

task("deploy-mainnet", "Deploys contract on a provided network")
	.addParam("privateKey", "Please provide the private key")
	.setAction(async ({privateKey}) => {
		const deployLibrary = require("./scripts/deploy-with-params");
		await deployLibrary(privateKey);
});

subtask("print", "Prints a message")
    .addParam("message", "The message to print")
    .setAction(async (taskArgs) => {
      console.log(taskArgs.message);
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: {
		version: "0.8.0",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	networks: {
		rinkeby: {
			url: "https://rinkeby.infura.io/v3/40c2813049e44ec79cb4d7e0d18de173",
			accounts: [process.env.PRIVATE_KEY]
		}
	},
	etherscan: {
		// Your API key for Etherscan
		// Obtain one at https://etherscan.io/
		apiKey: "CHIRAADNUI814XIT9ST36R63UFNBNDKBDY"
	}	
};
