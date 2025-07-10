import "../assets/styles/styles.scss";
import "./panier.scss";

const cartContainer = document.getElementById("cart-container");
const totalPriceElement = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cart);

if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
  totalPriceElement.textContent = "";
} else {
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const productEl = document.createElement("div");
    productEl.classList.add("cart-item");
    productEl.innerHTML = `
      <img src=".${item.image}" alt="${item.name}" style="width:300px;" />
      <h2>${item.name}</h2>
      <p>Prix : ${item.price} $</p>
      <p>Quantité : ${item.quantity}</p>
      <p>Total : ${(item.price * item.quantity).toFixed(2)} $</p>
      <button class="remove-btn" data-id="${item.id}">Supprimer</button>
      <hr/>
    `;

    cartContainer.appendChild(productEl);
  });

  totalPriceElement.textContent = `Total du panier : ${total.toFixed(2)} $`;
}

document.addEventListener("click", function (button) {
  if (button.target.classList.contains("remove-btn")) {
    const idToRemove = parseInt(button.target.dataset.id);
    cart = cart.filter((item) => item.id !== idToRemove);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
});
