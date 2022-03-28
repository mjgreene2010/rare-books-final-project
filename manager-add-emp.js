let username = document.getElementById("username");
let tempPassword = document.getElementById("temp-password");
let confirmTempPassword = document.getElementById("confirm-temp-password");
let email = document.getElementById("employee-email");
let firstName = document.getElementById("first-name");
let lastName = document.getElementById("last-name");
let storeNumber = document.getElementById("store-number");
let isManagerRadio = document.getElementsByName("manager");
let submitForm = document.getElementById("submit-employee");

submitForm.addEventListener("click", function (e) {
  e.preventDefault();

  let selected = [...isManagerRadio].find((radio) => {
    return radio.checked;
  });

  console.log(selected.value);
  // const userData = {
  //   firstName: firstName.value,
  //   lastName: lastName.value,
  //   username: `${username.value}`,
  //   password: tempPassword.value,
  //   email: email.value,
  //   storeNumber: storeNumber.value,
  //   isManager: Boolean(selected.value),
  // };

  try {
    fetch(`http://localhost:3000/users`, {
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
