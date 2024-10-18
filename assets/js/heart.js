window.addEventListener("DOMContentLoaded", function () {
    const hearts = document.querySelectorAll(".heart");
    const open = document.querySelectorAll(".heartOpen");
    const heartcnts = document.querySelectorAll(".heartcnt");
    const body = document.querySelector("body");
    const close = document.querySelector(".closeHeart");
    const favoriteList = document.querySelector('.listHeart'); // Assuming you have this list element
    const favoriteCountDisplay = document.querySelectorAll('.favoriteqtn'); // Display count of favorites

    if (hearts.length > 0 && heartcnts.length > 0) {
        hearts.forEach(function (heartIcon, index) {
            heartIcon.addEventListener("click", function () {
                heartcnts.forEach(function (heartcnt) {
                    heartcnt.textContent = parseInt(heartcnt.textContent) + 1;
                });

                const productItem = heartIcon.closest('.showcase'); // Assuming the heart icon is inside the product showcase
                const productName = productItem.querySelector('.showcase-title').textContent;
                const productPrice = parseFloat(productItem.querySelector('.price').textContent.replace('$', ''));
                const imageUrl = productItem.querySelector('.showcase-banner img.product-img.default').src;

                addOrIncrementFavorites(productName, productPrice, imageUrl);
                updateFavoriteCount();
            });
        });
    }
    open.forEach((hearticon) => {
        hearticon.addEventListener("click", () => {
          body.classList.toggle("showHeart");
        });
      });

    // Close favorites modal functionality
    close.addEventListener("click", () => {
        body.classList.toggle("showHeart");
    });

    // Function to add or increment favorite items
    function addOrIncrementFavorites(name, price, imageUrl) {
        let existingFavoriteItem = null;
        favoriteList.querySelectorAll('.item').forEach(favoriteItem => {
            const favoriteItemName = favoriteItem.querySelector('.name').textContent;
            if (favoriteItemName === name) {
                existingFavoriteItem = favoriteItem;
            }
        });

        if (existingFavoriteItem) {
            const favoritePrice = existingFavoriteItem.querySelector('.totalprice');
            incrementFavoriteItem(existingFavoriteItem, favoritePrice);
        } else {
            addToFavorites(name, price, imageUrl); // Pass the image URL here
        }

        saveFavoritesToStorage();
    }

    function addToFavorites(name, price, imageUrl) {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('item');

        const favoriteImage = document.createElement('img'); // Create image element
        favoriteImage.classList.add('image'); // Add the image class
        favoriteImage.src = imageUrl; // Set the image source
        favoriteItem.appendChild(favoriteImage); // Append the image to favorite item

        const favoriteName = document.createElement('div');
        favoriteName.classList.add('name');
        favoriteName.textContent = name;

        const favoritePrice = document.createElement('div');
        favoritePrice.classList.add('totalprice');
        favoritePrice.textContent = '$' + price.toFixed(2);

        const itemQtn = document.createElement('div');
        itemQtn.classList.add('quantity');

        const minus = document.createElement('span');
        const qtn = document.createElement('span');
        const plus = document.createElement('span');

        minus.textContent = '<';
        minus.classList.add('minus');
        qtn.textContent = '1';
        qtn.classList.add('itemqtn');
        plus.textContent = '>';
        plus.classList.add('plus');

        itemQtn.appendChild(minus);
        itemQtn.appendChild(qtn);
        itemQtn.appendChild(plus);

        favoriteItem.appendChild(favoriteName);
        favoriteItem.appendChild(favoritePrice);
        favoriteItem.appendChild(itemQtn);
        favoriteList.appendChild(favoriteItem);

        plus.addEventListener('click', () => {
            incrementFavoriteItem(favoriteItem, favoritePrice);
            updateFavoriteCount()
            saveFavoritesToStorage();
        });

        minus.addEventListener('click', () => {
            const item = favoriteItem;
            const qtn = item.querySelector('.itemqtn');
            if (parseInt(qtn.textContent) < 2) {
                removeFavoriteItem(item);
                updateFavoriteCount()
            } else {
                decrementFavoriteItem(item, favoritePrice);
                updateFavoriteCount()
            }
            
            saveFavoritesToStorage();
        });

        updateFavoriteCount()
        saveFavoritesToStorage();
    }

    function updateFavoriteCount() {
        const favoriteCount = document.querySelectorAll('.heartcnt');
        const favoriteItems = document.querySelectorAll('.listHeart .item');
        favoriteCount.forEach(count => {
            count.textContent = favoriteItems.length;
        });
    }

    function removeFavoriteItem(item) {
        item.remove();
        updateFavoriteCount();
        saveFavoritesToStorage();
    }

    function incrementFavoriteItem(item, favoritePrice) {
        const qtn = parseInt(item.querySelector('.itemqtn').textContent);
        
        if (!item.dataset.fixedPrice) {
            item.dataset.fixedPrice = parseFloat(favoritePrice.textContent.replace('$', ''));
        }

        const fixedPrice = parseFloat(item.dataset.fixedPrice);
        item.querySelector('.itemqtn').textContent = qtn + 1;

        item.querySelector('.totalprice').textContent = '$' + (fixedPrice * (qtn + 1)).toFixed(2);
        updateFavoriteCount();
    }

    function decrementFavoriteItem(item, favoritePrice) {
        const qtn = parseInt(item.querySelector('.itemqtn').textContent);

        if (!item.dataset.fixedPrice) {
            item.dataset.fixedPrice = parseFloat(favoritePrice.textContent.replace('$', ''));
        }

        const fixedPrice = parseFloat(item.dataset.fixedPrice);
        item.querySelector('.itemqtn').textContent = qtn - 1;

        item.querySelector('.totalprice').textContent = '$' + (fixedPrice * (qtn - 1)).toFixed(2);
        updateFavoriteCount();
    }

    function saveFavoritesToStorage() {
        const favoriteItems = document.querySelectorAll('.listHeart .item');
        const favoriteData = Array.from(favoriteItems).map(item => {
            return {
                name: item.querySelector('.name').textContent,
                price: item.querySelector('.totalprice').textContent.replace('$', ''),
                quantity: item.querySelector('.itemqtn').textContent,
                image: item.querySelector('.image').src // Save the image URL as well
            };
        });
        localStorage.setItem('favorites', JSON.stringify(favoriteData));
    }

    function loadFavoritesFromStorage() {
        const favoriteData = JSON.parse(localStorage.getItem('favorites')) || [];

        favoriteData.forEach(favoriteItemData => {
            const name = favoriteItemData.name;
            const price = parseFloat(favoriteItemData.price);
            const quantity = parseInt(favoriteItemData.quantity);
            const image = favoriteItemData.image;

            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('item');

            const favoriteImage = document.createElement('img'); // Create image element
            favoriteImage.classList.add('image'); // Add the image class
            favoriteImage.src = image; // Set the image source
            favoriteItem.appendChild(favoriteImage); // Append the image to favorite item

            const favoriteName = document.createElement('div');
            favoriteName.classList.add('name');
            favoriteName.textContent = name;

            const favoritePrice = document.createElement('div');
            favoritePrice.classList.add('totalprice');
            favoritePrice.textContent = '$' + (price * quantity).toFixed(2);

            const itemQtn = document.createElement('div');
            itemQtn.classList.add('quantity');

            const minus = document.createElement('span');
            const qtn = document.createElement('span');
            const plus = document.createElement('span');

            minus.textContent = '<';
            minus.classList.add('minus');
            qtn.textContent = quantity;
            qtn.classList.add('itemqtn');
            plus.textContent = '>';
            plus.classList.add('plus');

            itemQtn.appendChild(minus);
            itemQtn.appendChild(qtn);
            itemQtn.appendChild(plus);

            favoriteItem.appendChild(favoriteName);
            favoriteItem.appendChild(favoritePrice);
            favoriteItem.appendChild(itemQtn);
            favoriteList.appendChild(favoriteItem);

            plus.addEventListener('click', () => {
                incrementFavoriteItem(favoriteItem, favoritePrice);
                saveFavoritesToStorage();
            });

            minus.addEventListener('click', () => {
                const item = favoriteItem;
                const qtn = item.querySelector('.itemqtn');
                if (parseInt(qtn.textContent) < 2) {
                    removeFavoriteItem(item);
                } else {
                    decrementFavoriteItem(item, favoritePrice);
                }
                saveFavoritesToStorage();
            });
        });

        updateFavoriteCount();
    }

    loadFavoritesFromStorage(); // Load favorites when DOM is loaded
});
