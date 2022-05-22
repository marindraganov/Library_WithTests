const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Library", function () {
	let libraryFactory;
    let library;
    let owner;
    let addr1;

    before(async () => {
        libraryFactory = await ethers.getContractFactory("Library");
        library = await libraryFactory.deploy();
        [owner, addr1] = await ethers.getSigners();
        await library.deployed();
    });

    it("Add book", async function () {
        const bookName = "Robinhood";
        await library.addBook(bookName, 2);
        let book = (await library.getBooks())[0];
        expect(book[0]).to.equal(bookName);
        //expect((book[2]).to.equal(2));
    });

    it("Borrow book history", async function () {
        library.borrowBook(0);
        expect((await library.getBookBorrowHistory(0))[0]).to.equal(owner.address);
    });

    it("Borrow book from the same user fail", async function () {
        expect(library.borrowBook(0)).to.be.revertedWith("Sorry you can't borrow a second coppy of this book.");
    });

    it("Update number of copies fail", async function () {
        await expect(library.updateNumberOfCopies(0, 0)).to.be
            .revertedWith("You can't reduce the book copies to a number less than the borrowed ones.");
    });

    it("Update number of copies", async function () {
        await library.updateNumberOfCopies(0, 1);
        expect((await library.getBooks())[0][2]).to.equal(1);
    });

    it("Borrow book from another user fails because of not available coppies", async function () {
        expect(library.connect(addr1).borrowBook(0)).to.be.revertedWith("Sorry we don't have an available copy of this book at the moment.");
    });

    it("Return book", async function () {
        await library.returnBook(0);
        expect((await library.getBooks())[0][3]).to.equal(1);
    });

    it("Borrow book from another user", async function () {
        await library.connect(addr1).borrowBook(0);
        expect((await library.getBookBorrowHistory(0))[1]).to.equal(addr1.address);
    });
});
