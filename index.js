"use strict";

const username = document.querySelector("#username");
const password = document.querySelector("#current-password");
const login_btn = document.querySelector("#submit-login");
const login_error = document.querySelector("#login-error");

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
        // if (
        //   username.value !== user.username ||
        //   password.value !== user.password
        // )
        //   return (login_error.innerHTML = `Wrong username or password.`);

        if (
          username.value === user.username &&
          password.value === user.password
        ) {
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = `/home.html`;
          return `${user.first_name}, you are logged in`;
        }
      });
      return (login_error.innerHTML = `Wrong username or password.`);
    });
};

login_btn.addEventListener("click", (e) => {
  e.preventDefault();
  getUsers();
});
