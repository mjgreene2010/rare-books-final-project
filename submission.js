"use strict";

let photo = document.getElementById("picture");
let title = document.getElementById("title");
let author = document.getElementById("author");
let year = document.getElementById("year");
let genre = document.getElementById("genre");
let condition = document.getElementById("condition");
let cost = document.getElementById("cost");
let quantity = document.getElementById("quantity");
let myForm = document.getElementById("submission__form");
const currentUser = document.getElementById("current-username");
const signout = document.getElementById("signout");
const autoLogout = document.getElementById("auto-logout-time");
const managerLink = document.getElementById("manager-link");

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

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(e);
  // debugger;
  console.log(title);
  const formData = {
    title: `${title.value}`,
    author: `${author.value}`,
    year: `${year.value}`,
    genre: `${genre.value}`,
    condition: `${condition.value}`,
    cost: `${cost.value}`,
    quantity: `${quantity.value}`,
  };

  try {
    fetch(`https://rare-books-final-project-api.herokuapp.com/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  } catch (error) {
    console.error("Error: error");
  } finally {
    window.location.href = "./home.html";
  }

  title.value = "";
  author.value = "";
  year.value = "";
  genre.value = "";
  condition.value = "";
  cost.value = "";
  quantity.value = "";
});
