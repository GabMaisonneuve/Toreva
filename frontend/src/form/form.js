import "../assets/styles/styles.scss";
import "./form.scss";

import "../assets/styles/styles.scss";

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");

// Event listener on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const product = Object.fromEntries(data.entries());

  const validationResult = checkProductForm(product);
  if (validationResult.valid) {
    const json = JSON.stringify(product);
    console.log("Produit prêt à être envoyé :", json);
    // Fetch POST or file write can go here
  } else {
    showErrors(validationResult.errors);
  }
});

// Custom function to validate product form
function checkProductForm(product) {
  const errors = [];

  if (!product.nom?.trim()) {
    errors.push("Le nom du produit est requis.");
  }

  if (!product.marque?.trim()) {
    errors.push("La marque du produit est requise.");
  }

  if (!product.image?.trim()) {
    errors.push("L'image est requise (nom du fichier ou URL).");
  }

  if (!product.description || product.description.length < 20) {
    errors.push("La description doit contenir au moins 20 caractères.");
  }

  const priceCheck = isValidPrice(product.prix);
  if (priceCheck !== true) {
    errors.push(priceCheck);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Price validation helper
function isValidPrice(value) {
  if (!value) return "Le prix est requis.";
  if (!/^\d+(\.\d{1,2})?$/.test(value))
    return "Le prix doit être un nombre avec max 2 décimales.";
  const number = parseFloat(value);
  if (number <= 0) return "Le prix doit être supérieur à zéro.";
  if (number > 100000) return "Ce prix semble trop élevé.";
  return true;
}

// Display errors in the HTML
function showErrors(messages) {
  errorList.innerHTML = messages.map((msg) => `<li>${msg}</li>`).join("");
}
