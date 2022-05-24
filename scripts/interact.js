const hre = require("hardhat");
const Library = require('../artifacts/contracts/Library.sol/Library.json')

const run = async function() {
	const provider = new hre.ethers.providers.JsonRpcProvider("http://localhost:8545")

	const wallet = new hre.ethers.Wallet('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', provider);
	const balance = await wallet.getBalance();
	console.log(hre.ethers.utils.formatEther(balance, 18))

	const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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