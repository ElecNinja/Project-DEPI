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
  const addToCartBtns = document.querySelectorAll(
    'button.btn-action ion-icon[name="bag-add-outline"]'
  );
  const cartCountSpan = document.querySelector(".action-btn.cart .count");
  let cartCount = parseInt(cartCountSpan.textContent) || 0;

  addToCartBtns.forEach((btn) => {
    btn.parentElement.addEventListener("click", function () {
      cartCount++;
      cartCountSpan.textContent = cartCount;
      // Updating the cart items array
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtns = document.querySelectorAll(
    'button.btn-action ion-icon[name="bag-add-outline"]'
  );
  const cartCountSpan = document.querySelector(".action-btn.cart .count");
  const listCart = document.querySelector(".listCart");
  let cartCount = parseInt(cartCountSpan.textContent) || 0;

  addToCartBtns.forEach((btn) => {
    btn.parentElement.addEventListener("click", function () {
      const product = this.closest(".showcase");
      const productName = product.querySelector(".showcase-title").textContent;
      const productPrice = product.querySelector(".price").textContent;
      const productImage = product.querySelector(".product-img.default").src;

      addToCart(productName, productPrice, productImage);
      cartCount++;
      cartCountSpan.textContent = cartCount;
    });
  });

  function addToCart(name, price, image) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("item");
    cartItem.innerHTML = `
      <div class="image">
        <img src="${image}" alt="${name}" />
      </div>
      <div class="name">${name}</div>
      <div class="totalprice">${price}</div>
      <div class="quantity">
        <span class="minus"><</span>
        <span>1</span>
        <span class="plus">></span>
      </div>
    `;
    listCart.appendChild(cartItem);
  }
});
