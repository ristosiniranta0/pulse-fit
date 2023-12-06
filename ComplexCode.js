/*
   Filename: ComplexCode.js

   Description: This code demonstrates a complex and sophisticated JavaScript program that integrates multiple functionalities
   and provides a comprehensive solution for managing a library system.

   Author: Jane Doe
   Date: September 15, 2022
*/

// Constants related to library system
const LIBRARY_NAME = "My Awesome Library";
const LIBRARY_ADDRESS = "123 Main St, City, State";
const LIBRARY_CONTACT_NUMBER = "555-1234";

// Class for managing books
class Book {
  constructor(title, author, publicationYear) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
  }

  toString() {
    return `${this.title} - ${this.author} (${this.publicationYear})`;
  }
}

// Class for managing library members
class Member {
  constructor(name, memberId, email) {
    this.name = name;
    this.memberId = memberId;
    this.email = email;
    this.checkedOutBooks = [];
  }

  checkoutBook(book) {
    this.checkedOutBooks.push(book);
  }

  returnBook(book) {
    const bookIndex = this.checkedOutBooks.indexOf(book);
    if (bookIndex !== -1) {
      this.checkedOutBooks.splice(bookIndex, 1);
    }
  }

  toString() {
    return `${this.name} (ID: ${this.memberId}, Email: ${this.email})`;
  }
}

// Class for managing the library system
class Library {
  constructor(name, address, contactNumber) {
    this.name = name;
    this.address = address;
    this.contactNumber = contactNumber;
    this.books = [];
    this.members = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const bookIndex = this.books.indexOf(book);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    }
  }

  registerMember(member) {
    this.members.push(member);
  }

  unregisterMember(member) {
    const memberIndex = this.members.indexOf(member);
    if (memberIndex !== -1) {
      this.members.splice(memberIndex, 1);
    }
  }

  printBooks() {
    console.log(`Books in ${this.name}:`);
    this.books.forEach((book) => console.log(book.toString()));
  }

  printMembers() {
    console.log(`Members of ${this.name}:`);
    this.members.forEach((member) => console.log(member.toString()));
  }
}

// Creating library system
const library = new Library(LIBRARY_NAME, LIBRARY_ADDRESS, LIBRARY_CONTACT_NUMBER);

// Adding books to the library
const book1 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 1960);
const book3 = new Book("1984", "George Orwell", 1949);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Creating library members
const member1 = new Member("John Doe", "1001", "john.doe@example.com");
const member2 = new Member("Jane Smith", "1002", "jane.smith@example.com");

library.registerMember(member1);
library.registerMember(member2);

// Performing library operations
console.log("--- Library System ---");
library.printBooks();
library.printMembers();

console.log("--- Library Operations ---");
console.log(`${member1.name} checking out ${book1.title}`);
member1.checkoutBook(book1);
console.log(`${member2.name} checking out ${book2.title}`);
member2.checkoutBook(book2);
console.log(`${member1.name} returning ${book1.title}`);
member1.returnBook(book1);

console.log("--- Updated Library System ---");
library.printBooks();


// More functionality can be added to the library system based on specific requirements.