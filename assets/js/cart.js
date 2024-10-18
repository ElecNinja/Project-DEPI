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
  const productActions = document.querySelectorAll(".showcase-actions");
  const productItems = document.querySelectorAll(".showcase");

  loadCartFromStorage();

  productActions.forEach((item, index) => {
    const addToCartButton = item.querySelectorAll(".cartbtn");

    addToCartButton.forEach((button) => {
      button.addEventListener("click", () => {
        const productItem = productItems[index];
        const productName =
          productItem.querySelector(".showcase-title").textContent;
        const productPrice = parseFloat(
          productItem.querySelector(".price").textContent.replace("$", "")
        );

        addOrIncrementCart(productItem, productName, productPrice);
        updateCartCount();
      });
    });
  });
});

function addOrIncrementCart(productItem, name, price) {
  const cart = document.querySelector(".listCart");

  // Get the image URL from the showcase-banner
  const imageUrl = productItem.querySelector(
    ".showcase-banner img.product-img.default"
  ).src;

  let existingCartItem = null;
  cart.querySelectorAll(".item").forEach((cartItem) => {
    const cartItemName = cartItem.querySelector(".name").textContent;
    if (cartItemName === name) {
      existingCartItem = cartItem;
    }
  });

  if (existingCartItem) {
    const cartPrice = existingCartItem.querySelector(".totalprice");
    incrementCartItem(existingCartItem, cartPrice);
  } else {
    addToCart(name, price, imageUrl); // Pass the image URL here
  }

  saveCartToStorage();
}

function addToCart(name, price, imageUrl) {
  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  const cartImage = document.createElement("img"); // Create image element
  cartImage.classList.add("image"); // Add the image class
  cartImage.src = imageUrl; // Set the image source
  cartItem.appendChild(cartImage); // Append the image to cart item

  const cartName = document.createElement("div");
  cartName.classList.add("name");
  cartName.textContent = name;

  const cartPrice = document.createElement("div");
  cartPrice.classList.add("totalprice");
  cartPrice.textContent = "$" + price.toFixed(2);

  const itemQtn = document.createElement("div");
  itemQtn.classList.add("quantity");

  const minus = document.createElement("span");
  const qtn = document.createElement("span");
  const plus = document.createElement("span");

  minus.textContent = "<";
  minus.classList.add("minus");
  qtn.textContent = "1";
  qtn.classList.add("itemqtn");
  plus.textContent = ">";
  plus.classList.add("plus");

  itemQtn.appendChild(minus);
  itemQtn.appendChild(qtn);
  itemQtn.appendChild(plus);

  const cart = document.querySelector(".listCart");
  cartItem.appendChild(cartName);
  cartItem.appendChild(cartPrice);
  cartItem.appendChild(itemQtn);
  cart.appendChild(cartItem);

  plus.addEventListener("click", () => {
    incrementCartItem(cartItem, cartPrice);
    saveCartToStorage();
  });

  minus.addEventListener("click", () => {
    const item = cartItem;
    const qtn = item.querySelector(".itemqtn");
    if (parseInt(qtn.textContent) < 2) {
      removeCartItem(item);
    } else {
      decrementCartItem(item, cartPrice);
    }
    saveCartToStorage();
  });

  saveCartToStorage();
}

function updateCartCount() {
  const cartCount = document.querySelectorAll(".cartqtn");
  const cartItems = document.querySelectorAll(".item");
  cartCount.forEach((count) => {
    count.textContent = cartItems.length;
  });
}

function removeCartItem(item) {
  item.remove();
  updateCartCount();
  saveCartToStorage();
}

function incrementCartItem(item, cartPrice) {
  const qtn = parseInt(item.querySelector(".itemqtn").textContent);

  if (!item.dataset.fixedPrice) {
    item.dataset.fixedPrice = parseFloat(
      cartPrice.textContent.replace("$", "")
    );
  }

  const fixedPrice = parseFloat(item.dataset.fixedPrice);
  item.querySelector(".itemqtn").textContent = qtn + 1;

  updateCartCount();

  item.querySelector(".totalprice").textContent =
    "$" + (fixedPrice * (qtn + 1)).toFixed(2);
}

function decrementCartItem(item, cartPrice) {
  const qtn = parseInt(item.querySelector(".itemqtn").textContent);

  if (!item.dataset.fixedPrice) {
    item.dataset.fixedPrice = parseFloat(
      cartPrice.textContent.replace("$", "")
    );
  }

  const fixedPrice = parseFloat(item.dataset.fixedPrice);
  item.querySelector(".itemqtn").textContent = qtn - 1;

  updateCartCount();

  item.querySelector(".totalprice").textContent =
    "$" + (fixedPrice * (qtn - 1)).toFixed(2);
}

function saveCartToStorage() {
  const cartItems = document.querySelectorAll(".listCart .item");
  const cartData = Array.from(cartItems).map((item) => {
    return {
      name: item.querySelector(".name").textContent,
      price: item.querySelector(".totalprice").textContent.replace("$", ""),
      quantity: item.querySelector(".itemqtn").textContent,
      image: item.querySelector(".image").src, // Save the image URL as well
    };
  });
  localStorage.setItem("cart", JSON.stringify(cartData));
}

function loadCartFromStorage() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  cartData.forEach((cartItemData) => {
    const name = cartItemData.name;
    const price = parseFloat(cartItemData.price);
    const quantity = parseInt(cartItemData.quantity);
    const image = cartItemData.image; // Load the image URL

    const cartItem = document.createElement("div");
    cartItem.classList.add("item");

    const cartImage = document.createElement("img"); // Create image element
    cartImage.classList.add("image"); // Add the image class
    cartImage.src = image; // Set the image source
    cartItem.appendChild(cartImage); // Append the image to cart item

    const cartName = document.createElement("div");
    cartName.classList.add("name");
    cartName.textContent = name;

    const cartPrice = document.createElement("div");
    cartPrice.classList.add("totalprice");
    cartPrice.textContent = "$" + (price * quantity).toFixed(2);

    const itemQtn = document.createElement("div");
    itemQtn.classList.add("quantity");

    const minus = document.createElement("span");
    const qtn = document.createElement("span");
    const plus = document.createElement("span");

    minus.textContent = "<";
    minus.classList.add("minus");
    qtn.textContent = quantity;
    qtn.classList.add("itemqtn");
    plus.textContent = ">";
    plus.classList.add("plus");

    itemQtn.appendChild(minus);
    itemQtn.appendChild(qtn);
    itemQtn.appendChild(plus);

    const cart = document.querySelector(".listCart");
    cartItem.appendChild(cartName);
    cartItem.appendChild(cartPrice);
    cartItem.appendChild(itemQtn);
    cart.appendChild(cartItem);

    plus.addEventListener("click", () => {
      incrementCartItem(cartItem, cartPrice);
      saveCartToStorage();
    });

    minus.addEventListener("click", () => {
      const item = cartItem;
      const qtn = item.querySelector(".itemqtn");
      if (parseInt(qtn.textContent) < 2) {
        removeCartItem(item);
      } else {
        decrementCartItem(item, cartPrice);
      }
      saveCartToStorage();
    });
  });

  updateCartCount();
}
