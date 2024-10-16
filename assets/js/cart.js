let carticons = document.querySelectorAll(".cart");
let close = document.querySelector(".close");
let body = document.querySelector("body");
let checkout = document.querySelector(".checkout");

carticons.forEach((carticons) => {
  carticons.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
});
close.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
checkout.addEventListener("click", () => {
  window.location.href = "Checkout.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.getElementById("addToCartBtn");
  const cartCountSpan = document.querySelector(".action-btn.cart .count");
  let cartCount = 0;

  addToCartBtn.addEventListener("click", function () {
    cartCount++;
    cartCountSpan.textContent = cartCount;
    // Updating the cart items array
  });
});
