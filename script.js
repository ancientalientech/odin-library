const myLibrary = [];

function Book(title, author, pages, read) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}`;
    }
}

const addBookToLibrary = (title, author, pages, read) => {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary("Fish", "The Dude", 256, true);
addBookToLibrary("Meat", "The Guy", 128, false);
addBookToLibrary("Potato", "The Man", 380, true);

const container = document.querySelector(".table");

const showLibrary = () => {
    const tempBody = document.createElement("tbody");
    myLibrary.forEach(book => {
        const tempRow = document.createElement("tr");

        const titleElement = document.createElement("td");
        titleElement.textContent = book.title;

        const authorElement = document.createElement("td");
        authorElement.textContent = book.author;

        const pagesElement = document.createElement("td");
        pagesElement.textContent = book.pages;

        const readElement = document.createElement("td");
        readElement.textContent = book.read ? "Read" : "Not read yet";

        tempRow.appendChild(titleElement);
        tempRow.appendChild(authorElement);
        tempRow.appendChild(pagesElement);
        tempRow.appendChild(readElement);

        tempBody.appendChild(tempRow);
    });
    container.appendChild(tempBody);
}

showLibrary();

