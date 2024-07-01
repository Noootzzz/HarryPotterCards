//fonction fetch qui recupere les informations
function fetchCharacter() {
  let url = window.location.search;
  let slug = new URLSearchParams(url).get("slug");
  return fetch("https://hp-api.lainocs.fr/characters/" + slug).then(
    (response) => response.json()
  );
}

//fonction asynchrone pour afficher
async function displayCharacter() {
  const data = await fetchCharacter();

  document.querySelector("#card-view").innerHTML = `
        <h2>${data.slug}</h2>
        <div class="cards">
          <img src="${data.image}" alt="${data.name}">
          <div id="datas">
            <p>House : <span>${data.house || "No Data"}</span></p>
            <p>Actor : <span>${data.actor || "No Data"}</span></p>
            <p>Role : <span>${data.role || "No Data"}</span></p>
            <p>Patronus : <span>${data.patronus || "No Data"}</span></p>
            <p>Blood : <span>${data.blood || "No Data"}</span></p>
          </div>
        </div>
        
        <a href="details.html">Back</a>`;
}
//appel de la fonction
displayCharacter();

async function fetchHouse() {
  const data = await fetchCharacter();
  const house = data.house;

  // envoi de la maison à l'URL avec la méthode POST
  fetch("http://192.168.69.234:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ house: house }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Réponse de l'API :", data);
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de la maison :", error);
    });
}

// Appel de la fonction fetchHouse()
//fetchHouse();
