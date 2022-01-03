window.onload = () => {

 const books = [];

 const Book = (title, author) => {
  const element = document.createElement('div');
  element.className = 'card'
  element.innerHTML = 
  `<h2 class="card-title">${title}</h2>
   <h3 class="card-author">${author}</h3>
   <button type="button" class="btn" onclick="removeHandler()">Remove</button>
  `
  this.title = title;
  this.author = author;
  this.element = element;
 }

 const createAndAddNewBook = (title, author, collection) => {
  return collection.length < collection.push(new Book(title, author));
 }

 const removeBook = (reference, collection) => {
  collection.filter(book => book.title !== reference || book.author !== reference);
 }

 document
 .getElementById('add_button')
 .addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  if(createAndAddNewBook(title, author, books)){
   const bookSection = document.getElementById('book_section');
   bookSection.innerHTML = '';
   bookSection.append(...books.map(book => book.element));
  }
 });

 
}