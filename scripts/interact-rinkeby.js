const hre = require("hardhat");
const Library = require('../artifacts/contracts/Library.sol/Library.json')

const run = async function() {
	const provider = new hre.ethers.providers.InfuraProvider("rinkeby", "40c2813049e44ec79cb4d7e0d18de173")

	const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
	const balance = await wallet.getBalance();
	console.log(hre.ethers.utils.formatEther(balance, 18))

	const contractAddress = "0x5A725E734279BAFaA159BfAD0384f364De851881"
	const libraryContract = new hre.ethers.Contract(contractAddress, Library.abi, wallet)

	const addBookTx = await libraryContract.addBook("RobinHood", 2)
	await addBookTx.wait()

	const books = await libraryContract.getBooks()
	console.log(books)

	const borrowBookTx = await libraryContract.borrowBook(0)
	await borrowBookTx.wait()

	const borrowHistory = await libraryContract.getBookBorrowHistory(0)
	console.log("Book with id 0 is borrowed by" + borrowHistory)

	const returnBookTx = await libraryContract.returnBook(0)
	await returnBookTx.wait()

	const book = (await libraryContract.getBooks())[0]
	console.log("Book Name:" + book[0] + " Copies:" + book[3] + " Available:" + book[2])
}

run()