const formulaire = document.getElementById("reg-form");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault(); //eviter que la page se recharger quand on envoie
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-psw").value;

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
  } catch (error) {
    alert("Register error.");
  }
});
