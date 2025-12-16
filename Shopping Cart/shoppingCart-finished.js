// Your job is to build a working mini shopping cart app where users can add items,
// prices, AND quantities — but only if the input is valid.
//
// You will validate:
// 1) Item name must not be empty
// 2) Price must be:
//    a) A number
//    b) Greater than 0
// 3) Quantity must be:
//    a) A whole number
//    b) At least 1
// 4) Cart can contain max 10 items 
//
// You should:
// Show error messages under each input
// Update total price live (price * quantity)
// Use preventDefault() to stop form submission if invalid

// Step 1 — Make sure your script loads
console.log("Shopping cart script loaded!");

// Step 2 — Select all DOM elements
// You need to grab:
// 1) form
// 2) name + price + quantity inputs
// 3) error message <small> elements
// 4) cart list
// 5) total price
// 6) add button
// 7) cart message
const form = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const priceInput = document.getElementById("item-price");
const quantityInput = document.getElementById("item-quantity");

const nameError = document.getElementById("name-error");
const priceError = document.getElementById("price-error");
const quantityError = document.getElementById("quantity-error");

const cartList = document.getElementById("cart-list");
const totalPriceSpan = document.getElementById("total-price");

const cartMessage = document.getElementById("cart-message");
const addBtn = document.getElementById("add-btn");

// Step 3 — Build state for your cart
let cart = [];
const MAX_ITEMS = 10;
let totalItems = 0;

// Step 4 — Write validation helper functions
function isValidName() {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Item name is required.";
    return false;
  }
  nameError.textContent = "";
  return true;
}

function isValidPrice() {
  const price = parseFloat(priceInput.value);

  if (isNaN(price) || price <= 0) {
    priceError.textContent = "Enter a price greater than 0.";
    return false;
  }

  priceError.textContent = "";
  return true;
}

function isValidQuantity() {
  const quantity = parseInt(quantityInput.value, 10);

  if (isNaN(quantity) || quantity <= 0) {
    quantityError.textContent = "Enter a quantity of at least 1.";
    return false;
  }

  quantityError.textContent = "";
  return true;
}

// Step 5 — Update total
// Now we need to multiply price * quantity for each item.
function updateTotal() {
  let sum = 0;
  cart.forEach(item => {
    sum += item.price * item.quantity;
  });
  totalPriceSpan.textContent = sum.toFixed(2);
}

// Step 6 — Add item to DOM
function addItemToDOM(item) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${item.name} (x${item.quantity})</span>
    <span>$${(item.price * item.quantity).toFixed(2)}</span>
  `;
  cartList.appendChild(li);
}

// Step 7 — Disable button when cart is full
function checkCartLimit() {
  cart.forEach(item => totalItems += item.quantity)
  if (totalItems >= MAX_ITEMS) {
    addBtn.disabled = true;
    cartMessage.textContent = `Cart is full (${totalItems} items).`;
  } else {
    addBtn.disabled = false;
    cartMessage.textContent = "";
  }
}

// Step 8 — Handle form submission using e.preventDefault()
//
// e.preventDefault() stops the browser from doing what it normally does
// when a form is submitted (like refreshing the page).
// This allows us to run our own JavaScript code instead
// so we can validate the form and update the page without reloading.
//
// form.reset() clears the fields after a successful submission
// so the user can enter a new item without manually deleting text.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isValidName() || !isValidPrice() || !isValidQuantity()) return;
  if (totalItems + parseInt(quantityInput.value, 10) > MAX_ITEMS) {
    cartMessage.textContent = "Too many items in cart!"
    return
  }

  const item = {
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value),
    quantity: parseInt(quantityInput.value, 10),
  };

  cart.push(item);
  addItemToDOM(item);
  updateTotal();
  checkCartLimit();

  form.reset();
  // Optional: after reset, you could set quantity back to 1 if your HTML
  // does not already have value="1" on the quantity input.
  // quantityInput.value = 1;
});

// Step 9: Initialize cart state on first load
checkCartLimit();
updateTotal();