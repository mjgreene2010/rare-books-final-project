"use strict";

const bookListing = document.getElementById("book-listings");
const filterSpan = document.querySelector(".filter");
const bookFilter = document.getElementById("book-filter");
const heading = document.querySelector("#book-list-heading");
const filterBtn = document.querySelector(".submit-filter");
const sortBtn = document.querySelector(".sort-button");
const currentUser = document.getElementById("current-username");
const signout = document.getElementById("signout");
const autoLogout = document.getElementById("auto-logout-time");
const managerLink = document.getElementById("manager-link");

let someData;
let getId;

let userString = localStorage.getItem("user");
let userObject = JSON.parse(userString);

currentUser.innerHTML = `${userObject.first_name}, you are logged in!`;

if (userObject.isManager === false) managerLink.style.display = "none";

signout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "./index.html";
});

let timer = 60;

let countdown = () => {
  timer <= 15 && (autoLogout.innerHTML = `${timer} seconds remaining`);
  timer === 1 && logout();
  window.addEventListener("click", () => resetTimer());
  window.addEventListener("mousemove", () => resetTimer());
  window.addEventListener("mousedown", () => resetTimer());
  window.addEventListener("scroll", () => resetTimer());
  window.addEventListener("keypress", () => resetTimer());

  timer--;
};
setInterval(countdown, 1000);

function logout() {
  window.location.href = "index.html"; //Adapt to actual logout script
  localStorage.clear();
}
function resetTimer() {
  timer = 60;
  autoLogout.innerHTML = "";
}

const getBooks = function () {
  fetch(`http://localhost:3000/books`)
    .then((response) => response.json())
    .then((data) => (getId = data))
    .then((data) => {
      data.forEach((item) => {
        let bookInfo = document.createElement("book-row");
        bookInfo.setAttribute("class", "books");
        bookInfo.setAttribute("id", "book-row");
        let bookId = document.createElement("span");
        let bookTitle = document.createElement("span");
        bookTitle.setAttribute("id", "book-title");
        let bookAuthor = document.createElement("span");
        let bookYear = document.createElement("span");
        let bookGenre = document.createElement("span");
        let bookCondition = document.createElement("span");
        let bookCost = document.createElement("span");
        let bookQuantity = document.createElement("span");
        let emptySpace = document.createElement("span");

        bookId.innerHTML = item.id;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        emptySpace.innerHTML = "";
        bookId.setAttribute("id", "book-id");

        bookInfo.appendChild(bookId);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(emptySpace);
        bookListing.appendChild(bookInfo);
      });
    });
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
        let emptySpace = document.createElement("span");

        // bookImg.innerHTML = data[0].img;
        bookTitle.innerHTML = item.title;
        bookAuthor.innerHTML = item.author;
        bookYear.innerHTML = item.year;
        bookGenre.innerHTML = item.genre;
        bookCondition.innerHTML = item.condition;
        bookCost.innerHTML = `$${item.cost}`;
        bookQuantity.innerHTML = item.quantity;
        emptySpace.innerText = "";
        console.log(emptySpace);

        bookInfo.appendChild(bookImg);
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookYear);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookCondition);
        bookInfo.appendChild(bookCost);
        bookInfo.appendChild(bookQuantity);
        bookInfo.appendChild(emptySpace);
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
