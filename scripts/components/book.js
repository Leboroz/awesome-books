export default class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  createCard = (index, handler) => {
    const element = document.createElement('div');
    element.className = `row ${index % 2 === 0 ? '' : 'row-odd'} flex`;
    element.innerHTML = `<h2 class="row-title">"${this.title}" by ${this.author}</h2>
    `;

    const removeButton = document.createElement('button');
    removeButton.className = 'btn';
    removeButton.innerHTML = 'Remove';
    removeButton.onclick = handler;
    element.appendChild(removeButton);
    return element;
  };
}