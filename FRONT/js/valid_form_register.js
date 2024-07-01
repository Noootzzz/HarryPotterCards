//#1Aaaaaaaa

// FORMULAIRE
let form = document.querySelector("form");
console.log(form);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("Envoie du formulaire détecté")

  let errorContainer = document.querySelector(".message-error");
  let errorList = document.querySelector(".message-error ul");

  errorList.innerHTML = "";
  errorContainer.classList.remove("visible");

  // VERIF PSEUDO
  let pseudo = document.querySelector("#reg-name");
  if (pseudo.value.length < 6) {
    // console.log("invalide")
    errorContainer.classList.add("visible");
    pseudo.classList.remove("success");
    pseudo.classList.add("error");
    let err = document.createElement("li");
    err.innerHTML = "The pseudo must be at least 6 characters long.";
    errorList.appendChild(err);
  } else {
    // console.log("valide")
    pseudo.classList.add("success");
    pseudo.classList.remove("error");
  }

  // VERIF EMAIL
  let email = document.querySelector("#reg-email");
  if (email.value == "") {
    // console.log("invalide")
    errorContainer.classList.add("visible");
    email.classList.remove("success");
    email.classList.add("error");
    let err = document.createElement("li");
    err.innerHTML = "The email field cannot be empty.";
    errorList.appendChild(err);
  } else {
    // console.log("valide")
    email.classList.add("success");
    email.classList.remove("error");
  }

  // VERIF MDP
  let password = document.querySelector("#reg-psw");

  let passCheck = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
  );

  if (password.value.length < 10 || passCheck.test(password.value) == false) {
    // console.log("invalide")
    // console.log(password.value)
    errorContainer.classList.add("visible");
    password.classList.remove("success");
    password.classList.add("error");
    let err = document.createElement("li");
    err.innerHTML =
      "The password must be at least 10 characters long, contain : lowercase, uppercase, number, special character.";
    errorList.appendChild(err);
  } else {
    // console.log("valide")
    password.classList.add("success");
    password.classList.remove("error");
  }

  // VERIF MDP 2
  let passwordRepeat = document.querySelector("#reg-psw-verif");
  if (password.value != passwordRepeat.value) {
    // console.log("invalide")
    errorContainer.classList.add("visible");
    passwordRepeat.classList.remove("success");
    passwordRepeat.classList.add("error");
    let err = document.createElement("li");
    err.innerHTML = "Passwords are different.";
    errorList.appendChild(err);
  } else {
    // console.log("valide")
    passwordRepeat.classList.add("success");
    passwordRepeat.classList.remove("error");
  }

  let successContainer = document.querySelector(".message-success");
  successContainer.classList.remove("visible");

  if (
    pseudo.classList.contains("success") &&
    email.classList.contains("success") &&
    password.classList.contains("success") &&
    passwordRepeat.classList.contains("success")
  ) {
    successContainer.classList.add("visible");
    window.location.href = "login.html";
  }
});
