"use strict";

const username = document.querySelector("#username");
const password = document.querySelector("#current-password");
const login_btn = document.querySelector("#submit-login");

// username.addEventListener("keyup", function (e) {
//   console.log(e.target.value);
// });

// password.addEventListener("keyup", function (e) {
//   console.log(e.target.value);
// });

let getUsers = () => {
  fetch(`http://localhost:3000/users`)
    .then((response) => response.json())
    .then((users) => {
      if (username.value === "") return alert("please enter username");
      if (password.value === "") return alert("please enter password");
      users.forEach((user) => {
        console.log(user);
        if (
          username.value === user.username &&
          password.value === user.password
        )
          localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/home.html";
        return `${user.first_name}, you are logged in`;
      });
    });

  console.log("Clicked");
  // loop through array of users to match username and password
  //   window.location.href = "home.html";
  //   username.value = "";
  //   password.value = "";
};

login_btn.addEventListener("click", (e) => {
  e.preventDefault();
  getUsers();
});
