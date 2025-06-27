import "../assets/styles/styles.scss";
import "./connexion.scss";
import "../form/form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  if (validateLogin(user)) {
    const json = JSON.stringify(user);
    console.log("User login attempt:", json);
  }
});

function validateLogin(user) {
  errors = [];

  if (!user.email || !user.motdepasse) {
    errors.push("Tous les champs sont obligatoires.");
  }

  if (!validateEmail(user.email)) {
    errors.push("Adresse courriel invalide.");
  }

  displayErrors();
  return errors.length === 0;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function displayErrors() {
  errorElement.innerHTML = errors.map((e) => `<li>${e}</li>`).join("");
}
