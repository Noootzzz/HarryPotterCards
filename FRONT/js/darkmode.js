let darkMode = localStorage.getItem("darkmode");

const darkModeToggle = document.querySelector(".Darkmode");
const darkModeToggleRes = document.querySelector(".darkmode");

const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  // console.log("1");
  localStorage.setItem("darkmode", "enabled");
  darkModeToggle.innerHTML = "LightMode";
  darkModeToggleRes.innerHTML = "LightMode";
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  // console.log("2");
  localStorage.setItem("darkmode", null);
  darkModeToggle.innerHTML = "DarkMode";
  darkModeToggleRes.innerHTML = "DarkMode";
};

if (darkMode === "enabled") {
  enableDarkMode();
}

//au clique
darkModeToggle.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
darkModeToggleRes.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkmode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
