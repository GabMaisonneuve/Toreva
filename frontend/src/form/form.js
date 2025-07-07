import "../assets/styles/styles.scss";
import "./form.scss";

import "../assets/styles/styles.scss";
import { addItem } from "../../javascript/api.js";
import { modifyItem } from "../../javascript/api.js";
import { fetchSingleProduct } from "../../javascript/api.js";

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const product = Object.fromEntries(data.entries());
  product.price = parseFloat(product.price);

  const validationResult = checkProductForm(product);
  if (!validationResult.valid) {
    showErrors(validationResult.errors);
    return;
  }

  if (productId) {
    product.id = productId;
    const message = await modifyItem(productId, product);
    if (message === "Item modifié avec succès") {
      window.location.href = "../index.html";
    } else {
      showErrors([message]);
    }
    return;
  }

  // Add mode
  const message = await addItem(product);
  if (message === "Item ajouté avec succès") {
    form.reset();
    errorList.innerHTML = "";
  } else {
    showErrors([message]);
  }
});

function checkProductForm(product) {
  const errors = [];

  if (!product.name || product.name.trim() === "") {
    errors.push("Le nom du produit est requis.");
  }

  if (!product.category || product.category.trim() === "") {
    errors.push("La marque du produit est requise.");
  }

  if (!product.image || product.image.trim() === "") {
    errors.push("L'image est requise (nom du fichier ou URL).");
  }

  if (!product.description || product.description.length < 20) {
    errors.push("La description doit contenir au moins 20 caractères.");
  }

  const priceCheck = isValidPrice(product.price);
  if (priceCheck !== true) {
    errors.push(priceCheck);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

//Utilisation chatGPT pour le regex
function isValidPrice(value) {
  if (!value) return "Le prix est requis.";
  if (!/^\d+(\.\d{1,2})?$/.test(value))
    return "Le prix doit être un nombre avec max 2 décimales.";
  const number = parseFloat(value);
  if (number <= 0) return "Le prix doit être supérieur à zéro.";
  if (number > 100000) return "Ce prix semble trop élevé.";
  return true;
}

function showErrors(messages) {
  errorList.innerHTML = messages.map((msg) => `<li>${msg}</li>`).join("");
}

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

if (productId) {
  const product = await fetchSingleProduct(productId);

  document.querySelector('input[name="name"]').value = product.name;
  document.querySelector('input[name="category"]').value = product.category;
  document.querySelector('input[name="image"]').value = product.image;
  document.querySelector('textarea[name="description"]').value =
    product.description;
  document.querySelector('input[name="price"]').value = product.price;
}
