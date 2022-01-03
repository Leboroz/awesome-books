window.onload = () => {

 const books = [];
 const bookSection = document.getElementById('book_section');
 function Book(title, author) {
  const element = document.createElement('div');
  element.className = 'card';
  element.innerHTML = 
  `<h2 class="card-title">${title}</h2>
   <h3 class="card-author">${author}</h3>
  `;
  const removeButton = document.createElement('button');
  removeButton.className = 'btn';
  removeButton.innerHTML = 'Remove';
  removeButton.onclick = removeHandler;
  element.append(removeButton, document.createElement('hr'));
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
   bookSection.innerHTML = '';
   bookSection.append(...books.map(book => book.element));
  }
 });
 
 function removeHandler(e) {
  const card = e.target.parentNode;
  const title = card.children[0].innerHTML;
  bookSection.removeChild(card);
  removeBook(title, books);
 }
 
}