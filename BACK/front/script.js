const formulaire = document.getElementById("formulaire");
const formulaire_reg = document.getElementById("formulaire_reg");

formulaire.addEventListener("submit", async (event) => {
  event.preventDefault(); //eviter que la page se recharger quand on envoie
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  const token = data.token;

  localStorage.setItem("token", token);

  getMyProfile();
});

const getMyProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/getMyProfile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.log(data);
};
