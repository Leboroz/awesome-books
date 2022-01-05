import Book from './components/book.js';
import Methods from './components/bookList.js';

const bookList = new Methods();

const updateLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(bookList.list));
};

window.onload = () => {
  const bookSection = document.getElementById('book_section');
  const tracks = document.querySelector('.sections');
  const sections = Array.from(tracks.children);
  const navLinks = document.getElementById('nav_links');
  const date = document.getElementById('date');
  setInterval(() => {
    date.innerHTML = new Date().toUTCString();
  }, 1000)
  const removeHandler = (e) => {
    const card = e.target.parentNode;
    const title = card.children[0].innerHTML;
    bookSection.removeChild(card);
    bookList.removeBook(title);
    if (bookList.list.length === 0) { bookSection.setAttribute('data-visible', 'false'); }
    updateLocalStorage();
  };

  if (localStorage.getItem('books') !== null) {
    bookList.list = JSON.parse(localStorage.getItem('books')).map(book => new Book(book.title, book.author));
    bookSection
      .append(...bookList.list.map(
        (book, index) => book.createCard(index, removeHandler)
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
      const book = bookList.createAndAddNewBook(title, author);
      console.log(bookList[bookList.list.length - 1])
      if (title && author && book) {
        bookSection.appendChild(bookList.list[bookList.list.length - 1].createCard(bookList.list.length - 1, removeHandler));
        bookSection.setAttribute('data-visible', 'true');
        updateLocalStorage();
        e.clear();
        e.preventDefault()
      }
    });

  sections.forEach((section, index) => {
    const sectionWidth = section.getBoundingClientRect().width;
    section.style.left = sectionWidth * index + 'px'
  });

  const moveToSection = (container, currentSection, targetSection) => {
      container.style.transform = 'translateX(-' + targetSection.style.left + ')'
      currentSection.classList.remove('current-section');
      targetSection.classList.add('current-section');
  }
  
  navLinks.addEventListener('click', e => {
    const targetLink = e.target.closest('li');
    if(!targetLink) return;
    const currentSection = tracks.querySelector('.current-section');
    const targetIndex = Array.from(e.target.parentNode.children).findIndex(link => link === targetLink)
    const targetSection = sections[targetIndex];

    navLinks.querySelector('.nav-link__active').classList.remove('nav-link__active');
    targetLink.classList.add('nav-link__active');

    moveToSection(tracks, currentSection, targetSection);
  })
};