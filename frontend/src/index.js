import "./assets/styles/styles.scss";
import "./index.scss";
import { fetchProduct } from "../javascript/api.js";
import { deleteItem } from "../javascript/api.js";

//
// src/index.js
// import products from "../data/product.js";
import { env } from "../config/env.js";
const products = await fetchProduct();

console.log(env.BACKEND_URL);
const container = document.getElementById("products-container");

products.forEach((product) => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  // La ligne 28 utilisation chatGPT, tofixed faisait crash ma gallerie si je n'ajoutais pas number : 0.00
  card.innerHTML = `
  <a href="#">
    <div class="img-container">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="carte__detail">
      <h3>${product.category}</h3>
      <h2>${product.name}</h2>
      <h2>${product.price ? Number(product.price).toFixed(2) : "0.00"} $</h2>
      <div class="bouton__supprimmer">Delete</div>
      <div class="bouton__modifier">Edit</div>
    </div>
  </a>
`;

  const deleteButton = card.querySelector(".bouton__supprimmer");
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    deleteItem(product.id);
    card.remove();
  });

  const editButton = card.querySelector(".bouton__modifier");
  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `form/form.html?id=${product.id}`;
  });

  container.appendChild(card);
});
