import "../assets/styles/styles.scss";
import "./inscription.scss";
import "../form/form.scss";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
let errors = [];

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const user = Object.fromEntries(formData.entries());

  if (validateSignup(user)) {
    const json = JSON.stringify(user);
    console.log("User signed up:", json);
    // You can send this to a backend or localStorage
  }
});

function validateSignup(user) {
  errors = [];

  if (
    !user.nom ||
    !user.email ||
    !user.motdepasse ||
    !user.confirmerMotdepasse
  ) {
    errors.push("Tous les champs sont obligatoires.");
  }

  if (user.motdepasse !== user.confirmerMotdepasse) {
    errors.push("Les mots de passe ne correspondent pas.");
  }

  if (user.motdepasse && user.motdepasse.length < 6) {
    errors.push("Le mot de passe doit contenir au moins 6 caractères.");
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
