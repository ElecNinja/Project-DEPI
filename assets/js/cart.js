let carticons = document.querySelectorAll('.cart');
let close = document.querySelector('.close');
let body = document.querySelector('body');
let checkout = document.querySelector('.checkout');

carticons.forEach(carticons => {
    carticons.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });
});
close.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
checkout.addEventListener('click', () => {
    window.location.href = "Checkout.html";
});


