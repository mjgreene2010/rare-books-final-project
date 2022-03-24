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

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
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

  fetch(`http://localhost:3000/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error: error");
    });

  title.value = "";
  author.value = "";
  year.value = "";
  genre.value = "";
  condition.value = "";
  cost.value = "";
  quantity.value = "";

  location.href = "/home.html";
});
