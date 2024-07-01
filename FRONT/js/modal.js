const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const modal = document.getElementById("modal");

//ouvrir le modal
openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);
});

//fermer le modal
closeModalBtn.addEventListener("click", () => {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
});

//fermer si on clique en dehors du modal
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  }
});
