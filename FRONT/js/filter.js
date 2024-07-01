document.querySelectorAll(".maison-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    let maison = btn.getAttribute("data-maison");
    filterCartes(maison);
    updateCouleurs(maison);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  filterCartes(); // sans argument pour tout afficher
  updateCouleurs(); // reinitialiser les couleurs
});

function filterCartes(maison) {
  document.querySelectorAll(".hp-card").forEach((carte) => {
    if (!maison || carte.getAttribute("data-maison") === maison) {
      carte.style.display = "block";
    } else {
      carte.style.display = "none";
    }
  });
}

function updateCouleurs(maison = "") {
  const root = document.documentElement;
  const darkmode = document.documentElement.getElementsByClassName("darkmode");
  switch (maison) {
    case "Gryffindor":
      root.style.setProperty("--black-text", "#af130f");
      break;
    case "Slytherin":
      root.style.setProperty("--black-text", "#1a7219");
      break;
    case "Ravenclaw":
      root.style.setProperty("--black-text", "#0686ac");
      break;
    case "Hufflepuff":
      root.style.setProperty("--black-text", "#bf9307");
      break;
    default:
      root.style.setProperty("--black-text", "#111");
      break;
  }
}
