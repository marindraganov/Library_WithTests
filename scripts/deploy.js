const hre = require('hardhat')
const ethers = hre.ethers;

async function deployLibrary() {
    await hre.run('compile'); // We are compiling the contracts using subtask
    const [deployer] = await ethers.getSigners(); // We are getting the deployer
  
    console.log('Deploying contracts with the account:', deployer.address); // We are printing the address of the deployer
    console.log('Account balance:', (await deployer.getBalance()).toString()); // We are printing the account balance

    const Library = await ethers.getContractFactory("Library");
    const library = await Library.deploy();
    console.log('Waiting deployment...');
    await library.deployed();

    console.log('Library Contract address: ', library.address);
    console.log('Done!');
	
	await hre.run("verify:verify", {
        address: library.address,
        constructorArguments: [
         // if any
        ],
      });
}
  
module.exports = deployLibrary;