class Book {
 constructor(title, author) {
  this.title = title;
  this.author = author;
 }
}

export default class list {
 constructor() {
  this.list = []
 }

 createAndAddNewBook = (title, author) => {
  return this.list.length < this.list.push(new Book(title, author));
 }

 removeBook = (reference) => {
  this.list = this.list.filter(book => book.title !== reference);
 }
}