const formulaire = document.getElementById("reg-form");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault(); //eviter que la page se recharger quand on envoie
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    const token = data.token;

    if (token) {
      localStorage.setItem("token", token);
      alert("You are now connected with : " + email);
      window.location.href = "index.html";
    } else {
      throw new Error("Error Token");
    }
  } catch (error) {
    alert("Login error. Please check your email and password.");
  }
});
