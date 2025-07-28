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

const clearTable = () => {
    table = document.querySelector("tbody");
    if (table !== null) {
        container.removeChild(table);
    }
}

const deleteBook = id => {
    const index = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(index, 1);
}

const showLibrary = () => {
    clearTable();
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

        const buttonElement = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("data-id", book.id);
        tempRow.setAttribute("data-id", book.id);
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", (e) => {
            const books = document.querySelectorAll("tr");
            let bookRow;
            books.forEach(bk => {
                if(bk.dataset.id === e.target.dataset.id) {
                    bookRow = bk;
                }
            });
            deleteBook(e.target.dataset.id);
            showLibrary();
        });
        buttonElement.appendChild(deleteBtn);

        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.setAttribute("data-id", book.id);
        toggleReadBtn.classList.add("toggle-read-btn");
        toggleReadBtn.addEventListener("click", (e) => {
            const bookIndex = myLibrary.findIndex(book => book.id === e.target.dataset.id);
            if (myLibrary[bookIndex].read === false) {
                myLibrary[bookIndex].read = true;
            } else {
                myLibrary[bookIndex].read = false;
            }
            showLibrary();
        });
        toggleReadBtn.textContent = book.read ? "Not Read" : "Read";
        buttonElement.appendChild(toggleReadBtn);


        tempRow.appendChild(titleElement);
        tempRow.appendChild(authorElement);
        tempRow.appendChild(pagesElement);
        tempRow.appendChild(readElement);
        tempRow.appendChild(buttonElement);

        tempBody.appendChild(tempRow);
    });
    container.appendChild(tempBody);
}

showLibrary();

const dialog = document.querySelector("dialog");
const newBtn = document.querySelector("dialog + button");
const titleTxt = document.querySelector("#title");
const authorTxt = document.querySelector("#author");
const pagesTxt = document.querySelector("#pages");
const readChck = document.querySelector("#read");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");

newBtn.addEventListener("click", () => {
    dialog.showModal();
});

const clearForm = () => {
    titleTxt.value = "";
    authorTxt.value = "";
    pagesTxt.value = "";
    readChck.checked = false;
}

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    clearForm();
    dialog.close();
});

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addBookToLibrary(titleTxt.value, authorTxt.value, pagesTxt.value, read.checked);
    showLibrary();
    clearForm();
    dialog.close();
})