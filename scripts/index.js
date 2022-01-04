import Methods from './components/bookList.js';

const bookList = new Methods();

window.onload = () => {
  const bookSection = document.getElementById('book_section');

  const removeHandler = (e) => {
    const card = e.target.parentNode;
    const title = card.children[0].innerHTML;
    bookSection.removeChild(card);
    bookList.removeBook(title);
  };

  const createCard = (title, author) => {
    const element = document.createElement('div');
    element.className = 'card';
    element.innerHTML = `<h2 class="card-title">${title}</h2>
   <h3 class="card-author">${author}</h3>
  `;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn';
    removeButton.innerHTML = 'Remove';
    removeButton.onclick = removeHandler;
    return element;
  };

  if (localStorage.getItem('books') !== null) {
    bookList.list = JSON.parse(localStorage.getItem('books'));
    bookSection.append(...bookList.list.map((book) => createCard(book.title, book.author)));
  }

  const updateLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(bookList.list));
  };

  document
    .getElementById('add_button')
    .addEventListener('click', () => {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (bookList.createAndAddNewBook(title, author)) {
        bookSection.innerHTML = '';
        bookSection.append(...bookList.list.map((book) => createCard(book.title, book.author)));
        updateLocalStorage();
      }
    });
};