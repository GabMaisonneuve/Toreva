import "./assets/styles/styles.scss";
import "./index.scss";

//
// src/index.js
import products from "../data/product.js";

const container = document.getElementById("products-container");

products.forEach((product) => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <a href="#">
      <div><img src="${product.image}" alt="${product.name}" /></div>
      <span class="img-container"></span>
      <div class="carte__detail">
      <h3>${product.category}</h3>
      <h2>${product.name}</h2>
      <h2>${product.price.toFixed(2)} $</h2></div>
      
    </a>
  `;

  container.appendChild(card);
});
