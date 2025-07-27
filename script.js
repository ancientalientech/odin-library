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