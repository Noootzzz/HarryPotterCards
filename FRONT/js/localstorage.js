document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");

  //recup la valeur et l'injecter
  const storedEmail = localStorage.getItem("email");
  if (storedEmail) {
    emailInput.value = storedEmail;
  }
  emailInput.addEventListener("input", () => {
    localStorage.setItem("email", emailInput.value);
  });
});
