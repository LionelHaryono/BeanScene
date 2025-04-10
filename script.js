const cart = [];

const menuItems = [
  { id: 1, name: "Signature Coffee Blend", price: 30000 },
  { id: 2, name: "Espresso", price: 25000 },
  { id: 3, name: "Latte", price: 25000 },
  { id: 4, name: "Glaze Donut", price: 15000 },
];

function updateQuantity(itemId, delta) {
  const item = cart.find((i) => i.id === itemId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart.splice(cart.indexOf(item), 1);
    }
  } else if (delta > 0) {
    const menuItem = menuItems.find((i) => i.id === itemId);
    cart.push({ ...menuItem, quantity: 1 });
  }
  renderCart();
  updateMenuQty(itemId);
}

function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  const totalEl = document.querySelector(".cart-total");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <div class="cart-controls">
          <button onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <span>Rp ${(item.price * item.quantity).toLocaleString()}</span>
      </div>`;
  });

  totalEl.textContent = `Total: Rp ${total.toLocaleString()}`;
}

function updateMenuQty(itemId) {
  const item = cart.find((i) => i.id === itemId);
  const qtyElement = document.getElementById(`qty-${itemId}`);
  if (qtyElement) {
    qtyElement.textContent = item ? item.quantity : 0;
  }
}

function processPayment() {
  if (!cart.length) return alert("Keranjang kosong!");
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "payment.html";
}

function renderMenu() {
  const menuContainer = document.querySelector(".menu-buttons");
  menuContainer.innerHTML = menuItems
    .map(
      (item) => `
    <div class="menu-item">
      <h4>${item.name}</h4>
      <p>Rp ${item.price.toLocaleString()}</p>
      <div class="cart-controls">
        <button onclick="updateQuantity(${item.id}, -1)">-</button>
        <span id="qty-${item.id}">0</span>
        <button onclick="updateQuantity(${item.id}, 1)">+</button>
      </div>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
});
