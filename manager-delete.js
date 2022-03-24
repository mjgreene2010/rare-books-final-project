"use strict";

const bookListing = document.getElementById("book-listings");
const filterSpan = document.querySelector(".filter");
const bookFilter = document.getElementById("book-filter");
const heading = document.querySelector("#book-list-heading");
const filterBtn = document.querySelector(".submit-filter");
const sortBtn = document.querySelector(".sort-button");
let someData;
let getId;

const getBooks = function () {
  fetch(`http://localhost:3000/books`)
    .then((response) => response.json())
    .then((data) => (getId = data))
    .then((data) => {
      data.forEach((item) => {
        let bookInfo = document.createElement("book-row");
        bookInfo.setAttribute("class", "books");
        bookInfo.setAttribute("id", "book-row");
        // let bookImg = document.createElement("span");
        let bookTitle = document.createElement("span");
        bookTitle.setAttribute("id", "book-title");
        let bookAuthor = document.createElement("span");
        let bookYear = document.createElement("span");
        let bookGenre = document.createElement("span");
        let bookCondition = document.createElement("span");
        let bookCost = document.createElement("span");
        let bookQuantity = document.createElement("span");
        let bookDeleteBtn = document.createElement("span");
        let deleteBtn = document.createElement("button");
        let bookId = document.createElement("span");
        // bookId = item.id;
        bookDeleteBtn.appendChild(deleteBtn);

        bookId.innerHTML = item.id;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        deleteBtn.innerHTML = "X";
        // bookId.setAttribute("id", "book-id");
        deleteBtn.setAttribute("class", "delete-button");
        deleteBtn.setAttribute("type", "button");
        bookInfo.appendChild(bookImg);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(bookDeleteBtn);
        bookListing.appendChild(bookInfo);

        someData = document.querySelectorAll(".delete-button");
      });
      someData.forEach((item) => {
        item.addEventListener("click", function (e) {
          let id = item.parentElement.parentElement.firstChild.innerText;
          deleteBooks(id);
          // if (item.parentElement.parentElement === getId.
        });
      });
    });
};

console.log(getId);

const deleteBooks = function (id) {
  fetch(`http://localhost:3000/books/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
  window.location.href();
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
        let bookDeleteBtn = document.createElement("span");

        // bookImg.innerHTML = data[0].img;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        bookDeleteBtn.innerText = "X";

        console.log(bookDeleteBtn);

        bookInfo.appendChild(bookImg);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(bookDeleteBtn);
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
        let bookDeleteBtn = document.createElement("span");

        // bookImg.innerHTML = data[0].img;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        bookDeleteBtn.innerHTML = "X";
        bookInfo.appendChild(bookImg);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(bookDeleteBtn);
        bookListing.appendChild(bookInfo);
      });
    });
};

document.querySelectorAll("#sort-buttons").forEach((item) => {
  item.addEventListener("click", (e) =>
    sortBooks(e.target.innerHTML.trim().toLowerCase())
  );
});
