let username = document.getElementById("username");
let tempPassword = document.getElementById("temp-password");
let confirmTempPassword = document.getElementById("confirm-temp-password");
let email = document.getElementById("employee-email");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let storeNumber = document.getElementById("store-number");
let isManagerRadio = document.getElementsByName("manager");
let submitForm = document.getElementById("submit-employee");
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

submitForm.addEventListener("click", function (e) {
  e.preventDefault();

  let selected = [...isManagerRadio].find((radio) => {
    return radio.checked;
  });

  try {
    fetch(`https://rare-books-final-project-api.herokuapp.com/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: tempPassword.value,
        email: email.value,
        storeNumber: parseInt(storeNumber.value),
        isManager: selected.value === "true" ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  } catch (error) {
    console.error("Error: error");
  } finally {
    // console.log(isManager.value);
    // window.location.href = "/home.html";
  }

  // console.log(userData);
});
