const modal = document.querySelector("#addBookModal");
const overlay = document.querySelector("#overlay");
const form = document.querySelector("#addBookForm");
const booksGrid = document.querySelector("#cardsGrid");
const bookTitle = document.forms["addBookForm"]["book-title"];
const bookAuthor = document.forms["addBookForm"]["book-author"];
const bookPages = document.forms["addBookForm"]["book-pages"];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
};

let myLibrary = [];

const addBookToLibrary = (title, author, pages, status) => {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
  updateGrid();
};

const removeBookFromLibrary = (e) => {
  const index = e.target.parentNode.parentNode.getAttribute("data-index");
  myLibrary.splice(index, 1);
  updateGrid();
};

const changeStatus = (e) => {
  const index = e.target.parentNode.parentNode.getAttribute("data-index");
  myLibrary[index].status
    ? (myLibrary[index].status = false)
    : (myLibrary[index].status = true);
  updateGrid();
};

const modalOn = () => {
  modal.classList.add("active");
  overlay.classList.add("active");
};

const modalOff = () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  form.reset();
};

const updateGrid = () => {
  booksGrid.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    // Creating the card itself
    const bookCardDiv = document.createElement("div");
    bookCardDiv.classList.add("card");
    bookCardDiv.setAttribute("data-index", i);
    booksGrid.appendChild(bookCardDiv);

    // Creating the book title
    const pTitle = document.createElement("p");
    pTitle.textContent = `'${myLibrary[i].title}'`;
    bookCardDiv.appendChild(pTitle);

    // Creating the book author
    const pAuthor = document.createElement("p");
    pAuthor.textContent = `by ${myLibrary[i].author}`;
    bookCardDiv.appendChild(pAuthor);

    // Creating the pages
    const pPages = document.createElement("p");
    pPages.textContent = `${myLibrary[i].pages} pages`;
    bookCardDiv.appendChild(pPages);

    // Creating the button group
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("button-group");
    bookCardDiv.appendChild(btnGroup);

    // Creating the 'read' button
    const btnRead = document.createElement("button");
    btnRead.classList.add("btn");
    if (myLibrary[i].status) {
      btnRead.innerHTML = "Read";
      btnRead.classList.add("btn-approve");
    } else {
      btnRead.innerHTML = "Not read";
      btnRead.classList.add("btn-reject");
    };
    btnGroup.appendChild(btnRead);
    btnRead.addEventListener("click", changeStatus);

    // Creating the 'remove' button
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn", "btn-reject");
    btnRemove.innerHTML = "Remove";
    btnGroup.appendChild(btnRemove);
    btnRemove.addEventListener("click", removeBookFromLibrary);
  };
};

// Making the modal popup work
document.addEventListener("click", (e) => {
  if (e.target.className == "btn btn-add") {
    modalOn(e);
  } else if (e.target.className == "overlay active") {
    modalOff(e);
  };
});

// Tying the form modal to creating objects and adding 'em
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookStatus = document.getElementById("form-status").checked;
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookStatus
  );
  modal.classList.remove("active");
  overlay.classList.remove("active");
  modalOff(e);
});
