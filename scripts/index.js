window.onload = () => {

 const books = [];

 const Book = (title, author) => {
  this.title = title;
  this.author = author;
 }

 const createAndAddNewBook = (title, author, collection) => {
  collection.push(new Book(title, author));
 }

 const removeBook = (reference, collection) => {
  collection.filter(book => book.title !== reference || book.author !== reference);
 }
 
}