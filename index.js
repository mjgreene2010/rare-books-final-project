"use strict";

const username = document.querySelector("#username");
const password = document.querySelector("#pass_word");
const login_btn = document.querySelector("#submit-login");

username.addEventListener("keyup", function (e) {
  console.log(e.target.value);
});

password.addEventListener("keyup", function (e) {
  console.log(e.target.value);
});

login_btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (username.value === "") {
    alert("please enter username");
  } else if (password.value === "") {
    alert("please enter password");
  } else {
    console.log("Clicked");
    // loop through array of users to match username and password
    window.location.href = "home.html";
    username.value = "";
    password.value = "";
  }
});
