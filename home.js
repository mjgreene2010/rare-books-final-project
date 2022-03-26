"use strict";

const bookListing = document.getElementById("book-listings");
const filterSpan = document.querySelector(".filter");
const bookFilter = document.getElementById("book-filter");
const heading = document.querySelector("#book-list-heading");
const filterBtn = document.querySelector(".submit-filter");
const sortBtn = document.querySelector(".sort-button");
let someData;
let getId;

// const renderForm = function (data) {
let formHtml = `<div id="submission__container">
  <form id="submission__form">
    <span id="submission__field">
      <label for="id">Id:</label>
      <input type="number" id="id" value="" name="id" disabled/>
    </span>
    </br></br>
    <span id="submission__field">
      <label for="title">Title:</label>
      <input type="text" id="title" value="" name="title"/>
    </span>
    </br></br>
    <span id="submission__field">
      <label for="author">Author:</label>
      <input type="text" id="author" value="" name="author">
    </span>
    </br></br>
    <span id="submission__field">
      <label for="year">Year:</label>
      <input type="number" id="year" value="" name="year"/>
    </span>
    </br></br>
    <span id="submission__field">
      <label for="genre">Genre:</label>
      <input type="text" id="genre" placeholder="dropdown" value="" name="genre"/>
    </span>
    </br></br>
    <span id="submission__field">
      <label for="condition">Condition:</label>
      <input type="text" id="condition" placeholder="dropdown" value="" name="condition"/>
    </span>
    </br></br>
    <span id="submission__field">
      <label for="cost">Cost:</label>
      <input type="number" id="cost" value="" name="cost"/>
    </span>
  </br></br>
    <span id="submission__field">
      <label for="quantity">Quantity:</label>
      <input type="number" id="quantity" value="" name="quantity"/>
    </span>
    </br></br>
    <span>
      <label></label><button type="submit">Submit</button>
    </span>
  </form>
</div>`;
// };

const getBooks = function () {
  fetch(`http://localhost:3000/books`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        let bookInfo = document.createElement("book-row");
        bookInfo.setAttribute("class", "books");
        bookInfo.setAttribute("id", "book-row");
        let bookId = document.createElement("span");
        let bookTitle = document.createElement("span");
        let bookAuthor = document.createElement("span");
        bookTitle.setAttribute("id", "book-title");
        let bookYear = document.createElement("span");
        let bookGenre = document.createElement("span");
        let bookCondition = document.createElement("span");
        let bookCost = document.createElement("span");
        let bookQuantity = document.createElement("span");
        let bookUpdateBtn = document.createElement("span");
        let updateBtn = document.createElement("button");
        bookUpdateBtn.appendChild(updateBtn);

        bookId.innerHTML = item.id;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        updateBtn.innerHTML = "Update";
        bookId.setAttribute("id", "book-id");
        updateBtn.setAttribute("class", "update-button");
        updateBtn.setAttribute("type", "button");
        bookInfo.appendChild(bookId);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(bookUpdateBtn);
        bookListing.appendChild(bookInfo);

        someData = document.querySelectorAll(".update-button");
      });
      someData.forEach((item) => {
        let id = item.parentElement.parentElement.firstChild.innerHTML;
        item.addEventListener("click", () =>
          updatingBook(item.parentElement.parentElement)
        );
      });
    });

  const updatingBook = (book) => {
    console.log(book);
    let myModal = document.createElement("div");
    myModal.setAttribute("class", "modal");
    myModal.setAttribute("id", "myModal");

    // modal content
    let modalContent = document.createElement("div");
    myModal.setAttribute("class", "modal-content");
    let closeModal = document.createElement("span");
    closeModal.classList.add("close");
    closeModal.innerHTML = "&times;";
    myModal.insertAdjacentHTML("beforeend", formHtml);
    myModal.appendChild(closeModal);
    bookListing.appendChild(myModal);

    // // Get the modal
    var modal = document.getElementById("myModal");

    // // Get the <span> element that closes the modal
    var span = document.querySelector(".close");

    // // When the user clicks on <span> (x), close the modal
    span.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  };
};

const bookSearchBtn = () => {
  let inputValue = document.getElementById("book-search-input").value;
  if (inputValue === "") {
    bookListing.innerHTML = "";
    getBooks();
  } else if (inputValue.toLowerCase() === "") {
    console.log(inputValue);
  }
};
const inputValue = (e) => {
  e.preventDefault();
  console.log(e.target.value);
  e.target.value;
};

const getSearchBooks = function () {
  let inputValue = document.getElementById("book-search-input").value;

  fetch(`http://localhost:3000/books`)
    .then((response) => response.json())
    .then((data) =>
      data.filter((item) => {
        return (
          item.title.toLowerCase() === inputValue.toLowerCase() ||
          item.author.toLowerCase() === inputValue.toLowerCase()
        );
      })
    )
    .then((data) => {
      inputValue === "" && getBooks();
      bookListing.innerHTML = "";
      [...data].forEach((item) => {
        let bookInfo = document.createElement("book-row");
        bookInfo.setAttribute("class", "books");
        bookInfo.setAttribute("id", "book-row");
        let bookImg = document.createElement("span");
        let bookTitle = document.createElement("span");
        let bookAuthor = document.createElement("span");
        let bookYear = document.createElement("span");
        let bookGenre = document.createElement("span");
        let bookCondition = document.createElement("span");
        let bookCost = document.createElement("span");
        let bookQuantity = document.createElement("span");
        let emptyspace = document.createElement("span");

        // bookImg.innerHTML = data[0].img;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        bookInfo.appendChild(bookImg);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(emptyspace);
        bookListing.appendChild(bookInfo);
      });
    });
};

window.onload = getBooks();

const searchSpan = document.querySelector(".search");
const bookSearch = document.getElementById("book-search");
const searchBtn = document.createElement("button");

const toggleSearch = () => {
  let input = document.createElement("input");
  let btn = document.createElement("button");
  let span = document.createElement("span");
  if (searchSpan.getAttribute("value") === "false") {
    input.setAttribute("id", "book-search-input");
    input.setAttribute("type", "text");
    input.setAttribute("value", "");
    searchBtn.innerHTML = "Enter";
    searchBtn.classList = "submit-search";
    searchBtn.setAttribute("type", "button");
    span.appendChild(input);
    span.appendChild(searchBtn);
    span.classList = "input-button";
    searchSpan.appendChild(span);
    searchSpan.setAttribute("value", "true");
    searchSpan.setAttribute("id", "search");
    // input.addEventListener("keyup", inputValue);
    searchBtn.addEventListener("click", getSearchBooks);
  } else if (searchSpan.getAttribute("value") === "true") {
    searchSpan.lastChild.remove();
    searchSpan.setAttribute("value", "false");
  }
};

bookSearch.addEventListener("click", toggleSearch);

const sortBooks = (criteria) => {
  fetch(`http://localhost:3000/books`)
    .then((response) => response.json())
    .then((data) =>
      data.sort((a, b) => {
        if (typeof a[criteria] === "string") {
          a = a[criteria];
          b = b[criteria];
          return a > b ? 1 : -1;
        }

        if (typeof a[criteria] === "number") {
          a = a[criteria];
          b = b[criteria];
          return a - b;
        }
      })
    )
    .then((data) => {
      bookListing.innerHTML = "";
      [...data].forEach((item) => {
        let bookInfo = document.createElement("book-row");
        bookInfo.setAttribute("class", "books");
        bookInfo.setAttribute("id", "book-row");
        let bookImg = document.createElement("span");
        let bookTitle = document.createElement("span");
        let bookAuthor = document.createElement("span");
        let bookYear = document.createElement("span");
        let bookGenre = document.createElement("span");
        let bookCondition = document.createElement("span");
        let bookCost = document.createElement("span");
        let bookQuantity = document.createElement("span");
        let emptyspace = document.createElement("span");

        // bookImg.innerHTML = data[0].img;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        bookInfo.appendChild(bookImg);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(emptyspace);
        bookListing.appendChild(bookInfo);
      });
    });
};

document.querySelectorAll("#sort-buttons").forEach((item) => {
  item.addEventListener("click", (e) =>
    sortBooks(e.target.innerHTML.trim().toLowerCase())
  );
});
