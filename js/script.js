let cart = [];
let cartTotal = 0;

function addToCart(product, price, stockId, imageUrl) {
    const stockElem = document.getElementById(stockId);
    let stock = parseInt(stockElem.textContent);

    if (stock > 0) {
        cart.push({ product, price, stockId, imageUrl });
        cartTotal += price;
        stock -= 1;
        stockElem.textContent = stock;
        updateCart();
        showMessage(`${product} agregado al carrito.`);
    } else {
        showMessage(`Lo siento, no hay stock de ${product}.`);
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalElem = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${item.imageUrl}" alt="${item.product}"> ${item.product} - $${item.price.toFixed(2)} 
                        <button class="remove-button" onclick="removeFromCart(${index})">
                            <img src="img/trash.png" alt="Remove" class="remove-icon">
                        </button>`;
        cartItems.appendChild(li);
    });

    cartCount.textContent = cart.length;
    const cartTotal = cart.reduce((total, item) => total + item.price, 0);
    cartTotalElem.textContent = `$${cartTotal.toFixed(2)}`;
}


function toggleCart() {
    const cartElem = document.getElementById('cart');
    cartElem.style.display = cartElem.style.display === 'none' || cartElem.style.display === '' ? 'block' : 'none';
}

function showMessage(message) {
    const messageElem = document.getElementById('message');
    messageElem.textContent = message;
    messageElem.classList.add('show');
    setTimeout(() => {
        messageElem.classList.remove('show');
    }, 3000);
}

function removeFromCart(index) {
    const item = cart[index];
    const stockElem = document.getElementById(item.stockId);
    let stock = parseInt(stockElem.textContent);

    cartTotal -= item.price;
    cart.splice(index, 1);
    stock += 1;
    stockElem.textContent = stock;
    updateCart();
    showMessage(`${item.product} eliminado del carrito.`);
}

function checkout() {
    
    if (cart.length > 0) {
        cart = [];
        cartTotal = 0;
        updateCart();
        showMessage('Compra realizada con éxito.');
    } else {
        showMessage('El carrito está vacío.');
    }
}
