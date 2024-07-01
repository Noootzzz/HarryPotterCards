const cardsContainer = document.getElementById("booster-cards-container");
const drawButton = document.getElementById("booster-btn");

// Fonction pour ouvrir un booster
drawButton.addEventListener("click", async () => {
  // Vérifier le temps de la dernière ouverture du booster
  const lastOpenedTime = localStorage.getItem("lastOpenedTime");
  const currentTime = new Date().getTime();
  const maxTime = 0; //ouvrir à l'infinit
  //24 * 60 * 60 * 1000; // 24 heures en millisecondes

  if (lastOpenedTime && currentTime - parseInt(lastOpenedTime) < maxTime) {
    //si -24
    alert("Vous ne pouvez ouvrir un booster qu'une fois toutes les 24 heures.");
  } else {
    //si +24 ou premiere ouverture
    const cards = await drawRandomCards(5);
    displayCards(cards);

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/getMyProfile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataUser = await response.json();
    // console.log(dataUser);
    const id = dataUser.user.id; //id de l'user connecté
    // console.log(id);

    const idCards = cards.map((card) => card.id);
    await fetch("http://localhost:3000/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, idCards }),
    });

    //maj temps de la derniere ouverture du booster dans le localStorage
    localStorage.setItem("lastOpenedTime", currentTime.toString());
  }
});

//recup cartes aléatoire dans l'api
let availableCards = [];
async function drawRandomCards(numCards) {
  if (availableCards.length === 0) {
    const response = await fetch("https://hp-api.lainocs.fr/characters");
    availableCards = await response.json();
  }

  const randomCards = [];
  for (let i = 0; i < numCards; i++) {
    if (availableCards.length === 0) break; //si pas dartes break
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];
    randomCards.push(selectedCard);
    availableCards.splice(randomIndex, 1); //retirer la carte selectionnee du tableau des cartes disponibles
  }
  return randomCards;
}

//afficher les cartes choisis aleatoirement
function displayCards(cards) {
  cardsContainer.innerHTML = "";
  const cardList = document.createElement("ul"); //liste des cartes
  cardList.classList.add("card-list");

  // const title = document.createElement("h2");
  // title.innerHTML = "You got these cards :";
  // cardsContainer.appendChild(title);

  cards.forEach((card) => {
    const listItem = document.createElement("li");
    listItem.classList.add("hp-card");
    listItem.setAttribute("alt", card.slug);
    listItem.setAttribute("data-maison", card.house);

    const link = document.createElement("a");
    link.href = `card.html?slug=${card.slug}`;

    const h2 = document.createElement("h2");
    h2.textContent = card.name;

    const p = document.createElement("p");
    p.innerHTML = `House : ${card.house || "No Data"} </br> Actor : ${
      card.actor || "No Data"
    } </br> Role : ${card.role || "No Data"} `;

    const img = document.createElement("img");
    img.src = card.image;
    img.alt = card.name;

    link.appendChild(h2);
    link.appendChild(p);
    link.appendChild(img);
    listItem.appendChild(link);

    cardList.appendChild(listItem);
  });

  cardsContainer.appendChild(cardList);
}
