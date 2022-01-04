import Book from './book.js';

export default class list {
  constructor() {
    this.list = [];
  }

 createAndAddNewBook = (title, author) => this.list.length < this.list.push(new Book(title, author))

 removeBook = (reference) => {
   this.list = this.list.filter((book) => book.title !== reference);
 }
}