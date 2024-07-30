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
        li.innerHTML = `<img src="${item.imageUrl}" alt="${item.product}" class="cart-item-img"> ${item.product} - $${item.price.toFixed(2)} 
                        <button class="button" onclick="removeFromCart(${index})">
                            <svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
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

function comprarItems() {
    let total = 0;
    let error = false;
    let seleccionoProducto = false;

    if (cart.length === 0) {
        Swal.fire({
            title: "Carrito vacío",
            text: "El carrito está vacío.",
            icon: "error",
            confirmButtonText: "Ok",
        });
        return;
    }

    cart.forEach((producto) => {
        seleccionoProducto = true;
        total += producto.price;
    });

    if (!error) {
        if (seleccionoProducto) {

            Swal.fire({
                title: "Total",
                html: `
              <p>Total a pagar: <strong>$${total.toFixed(2)}</strong></p>
              <form id="paymentForm">
                <div class="form-group">
                  <label for="cardNumber">Número de tarjeta:</label>
                  <input type="text" id="cardNum" class="swal2-input" placeholder="Número de tarjeta" maxlength="16" required>
                </div>
                <div class="form-group">
                  <label for="expiryDate">Fecha de expiración:</label>
                  <input type="text" id="fechaExp" class="swal2-input" placeholder="MM/AA" maxlength="5" required>
                </div>
                <div class="form-group">
                  <label for="cvv">CVV:</label>
                  <input type="text" id="code" class="swal2-input" placeholder="CVV" maxlength="3" required>
                </div>
              </form>
            `,
                showCancelButton: true,
                confirmButtonText: "Pagar",
                cancelButtonText: "Cancelar",
                preConfirm: () => {
                    const cardNum = Swal.getPopup().querySelector("#cardNum").value;
                    const fechaExp = Swal.getPopup().querySelector("#fechaExp").value;
                    const code = Swal.getPopup().querySelector("#code").value;

                    if (!cardNum || !fechaExp || !code) {
                        Swal.showValidationMessage("Por favor complete todos los campos.");
                        return false;
                    }
                    return {
                        cardNum,
                        fechaExp,
                        code,
                    };
                },
            }).then((result) => {
                if (result.isConfirmed) {

                    Swal.fire({
                        title: "Compra exitosa",
                        html: `Valor total: <strong>$${total.toFixed(2)}</strong>`,
                        icon: "success",
                        confirmButtonText: "Ok",
                    });

                    cart = [];
                    cartTotal = 0;
                    updateCart();
                }
            });
        }
    }
}
