const hre = require('hardhat')
const ethers = hre.ethers;

async function deployLibrary(_privateKey) {
    await hre.run('compile'); 
    const wallet = new ethers.Wallet(_privateKey, hre.ethers.provider);
    console.log('Deploying contracts with the account:', wallet.address); 
    console.log('Account balance:', (await wallet.getBalance()).toString()); 

    const Library = await ethers.getContractFactory("Library", wallet);
    const library = await Library.deploy();
    console.log('Waiting deployment...');
    await library.deployed();

    console.log('Contract address: ', library.address);
    console.log('Done!');

	await hre.run("verify:verify", {
        address: library.address,
        constructorArguments: [
         // if any
        ],
      });
}
  
module.exports = deployLibrary;