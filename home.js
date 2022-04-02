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
  window.location.href = "index.html";
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

const renderForm = function (data, container) {
  // console.log(data[1].innerText);
  let html = `<div id="submission__container">
    <form id="submission__form">
      <span id="submission__field">
        <label for="id">Id:</label>
        <input type="number" id="id" value="${
          data[0].innerText
        }"  name="id" disabled/>
      </span>
      </br></br>
      <span id="submission__field">
        <label for="title">Title:</label>
        <input type="text" id="title" value="${
          data[1].innerText
        }"  name="title"/>
      </span>
      </br></br>
      <span id="submission__field">
        <label for="author">Author:</label>
        <input type="text" id="author" value="${
          data[2].innerText
        }" name="author">
      </span>
      </br></br>
      <span id="submission__field">
        <label for="year">Year:</label>
        <input type="number" id="year" value="${
          data[3].innerText
        }" name="year"/>
      </span>
      </br></br>
      <span id="submission__field">
        <label for="genre">Genre:</label>
        <input type="text" id="genre" placeholder="dropdown" value="${
          data[4].innerText
        }" name="genre"/>
      </span>
      </br></br>
      <span id="submission__field">
        <label for="condition">Condition:</label>
        <input type="text" id="condition" placeholder="dropdown" value="${
          data[5].innerText
        }" name="condition"/>
      </span>
      </br></br>
      <span id="submission__field">
        <label for="cost">Cost:</label>
        <input type="number" id="cost" value=${parseInt(
          data[6].innerText.replace("$", "")
        )} name="cost"/>
      </span>
    </br></br>
      <span id="submission__field">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" value="${
          data[7].innerText
        }" name="quantity"/>
      </span>
      </br></br>
      <span>
        <label></label><button id="update-button" type="submit">Submit</button>
      </span>
    </form>
  </div>`;
  container.insertAdjacentHTML("beforeend", html);
};

const getBooks = function () {
  fetch(`https://rare-books-final-project-api.herokuapp.com/books`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let bookInfo = document.createElement("book-row");
        bookInfo.setAttribute("class", "books");
        bookInfo.setAttribute("id", "book-row");
        let bookId = document.createElement("span");
        let bookTitle = document.createElement("span");
        let bookAuthor = document.createElement("span");

        let bookYear = document.createElement("span");
        let bookGenre = document.createElement("span");
        let bookCondition = document.createElement("span");
        let bookCost = document.createElement("span");
        let bookQuantity = document.createElement("span");
        let bookUpdateBtn = document.createElement("span");
        bookId.setAttribute("id", "book-id");
        bookTitle.setAttribute("id", "book-title");
        bookAuthor.setAttribute("id", "book-author");
        bookYear.setAttribute("id", "book-year");
        bookGenre.setAttribute("id", "book-genre");
        bookCondition.setAttribute("id", "book-condition");
        bookCost.setAttribute("id", "book-cost");
        bookQuantity.setAttribute("id", "book-quantity");
        let updateBtn = document.createElement("button");
        updateBtn.setAttribute("class", "update-button");
        updateBtn.setAttribute("type", "button");
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
    // console.log(book.children);
    let theModal = document.getElementById("the-modal");

    let myModal = document.createElement("div");
    myModal.setAttribute("class", "modal");
    myModal.setAttribute("id", "myModal");

    // modal content
    let modalContent = document.createElement("div");
    myModal.setAttribute("class", "modal-content");
    let closeModal = document.createElement("span");
    closeModal.classList.add("close");
    closeModal.innerHTML = "&times;";
    renderForm(book.children, myModal);
    myModal.appendChild(closeModal);
    theModal.appendChild(myModal);

    let updatedId = document.getElementById("id");
    let updatedTitle = document.getElementById("title");
    let updatedAuthor = document.getElementById("author");
    let updatedYear = document.getElementById("year");
    let updatedGenre = document.getElementById("genre");
    let updatedCondition = document.getElementById("condition");
    let updatedCost = document.getElementById("cost");
    let updatedQuantity = document.getElementById("quantity");
    let updateBtn = document.getElementById("update-button");

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

    updateBtn.addEventListener("click", (e) => {
      const formData = {
        id: `${updatedId.value}`,
        title: `${updatedTitle.value}`,
        author: `${updatedAuthor.value}`,
        year: parseInt(`${updatedYear.value}`),
        genre: `${updatedGenre.value}`,
        condition: `${updatedCondition.value}`,
        cost: parseInt(`${updatedCost.value}`),
        quantity: parseInt(`${updatedQuantity.value}`),
      };
      e.preventDefault();
      submitUpdatedBook(updatedId, formData);
    });
  };
};

function submitUpdatedBook(updatedId, formData) {
  try {
    fetch(
      `https://rare-books-final-project-api.herokuapp.com/books/${updatedId.value}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  } catch (error) {
    console.error("Error: error");
  }
  location.reload = "home.html";
}

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

  fetch(`https://rare-books-final-project-api.herokuapp.com/books`)
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
  fetch(`https://rare-books-final-project-api.herokuapp.com/books`)
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
