import Methods from './components/bookList.js';

const bookList = new Methods();

const updateLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(bookList.list));
};

window.onload = () => {
  const bookSection = document.getElementById('book_section');

  const removeHandler = (e) => {
    const card = e.target.parentNode;
    const title = card.children[0].innerHTML;
    bookSection.removeChild(card);
    bookList.removeBook(title);
    if (bookList.list.length === 0) { bookSection.setAttribute('data-visible', 'false'); }
    updateLocalStorage();
  };

  const createCard = (title, author, index) => {
    const element = document.createElement('div');
    element.className = `row ${index % 2 === 0 ? '' : 'row-odd'} flex`;
    element.innerHTML = `<h2 class="row-title">"${title}" by ${author}</h2>
    `;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn';
    removeButton.innerHTML = 'Remove';
    removeButton.onclick = removeHandler;
    element.appendChild(removeButton);
    return element;
  };

  if (localStorage.getItem('books') !== null) {
    bookList.list = JSON.parse(localStorage.getItem('books'));
    bookSection
      .append(...bookList.list.map(
        (book, index) => createCard(book.title, book.author, index),
      ));
    if (bookList.list.length !== 0) {
      bookSection.setAttribute('data-visible', 'true');
    }
  }

  document
    .getElementById('form')
    .addEventListener('submit', (e) => {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      if (title && author && bookList.createAndAddNewBook(title, author)) {
        bookSection.innerHTML = '';
        bookSection
          .append(...bookList.list.map(
            (book, index) => createCard(book.title, book.author, index),
          ));
        bookSection.setAttribute('data-visible', 'true');
        updateLocalStorage();
        e.preventDefault();
        e.target.reset();
      }
    });
};