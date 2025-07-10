import "./assets/styles/styles.scss";
import "./index.scss";
import { fetchProduct } from "../javascript/api.js";
import { deleteItem } from "../javascript/api.js";
import { env } from "../config/env.js";

const products = await fetchProduct();

console.log(env.BACKEND_URL);
const container = document.getElementById("products-container");

// Initialiser le panier si vide
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

products.forEach((product) => {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
    <a href="#">
      <div class="img-container">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="carte__detail" data-id="${product.id}">
        <h3>${product.category}</h3>
        <h2>${product.name}</h2>
        <h2>${product.price ? Number(product.price).toFixed(2) : "0.00"} $</h2>
        <div class="bouton__ajouter">Add to Cart</div>
        <div class="bouton__supprimmer">Delete</div>
        <div class="bouton__modifier">Edit</div>
      </div>
    </a>
  `;

  // Bouton Add to Cart
  const addButton = card.querySelector(".bouton__ajouter");
  addButton.addEventListener("click", (button) => {
    const productCard = button.target.closest(".carte__detail");
    const id = parseInt(productCard.dataset.id);
    const productData = products.find((p) => p.id === id);

    if (!productData) {
      alert("Produit introuvable !");
      return;
    }

    const productToAdd = {
      id: productData.id,
      name: productData.name,
      image: productData.image,
      price: Number(productData.price),
      quantity: 1,
    };

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === productToAdd.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !");
  });

  // Bouton Delete
  const deleteButton = card.querySelector(".bouton__supprimmer");
  deleteButton.addEventListener("click", (button) => {
    deleteItem(product.id);
    card.remove();
  });

  // Bouton Edit
  const editButton = card.querySelector(".bouton__modifier");
  editButton.addEventListener("click", (e) => {
    window.location.href = `form/form.html?id=${product.id}`;
  });

  container.appendChild(card);
});
