let cart = [];
let isFirstItem = true;

const cartButton = document.querySelector('.cart-button');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const continueShoppingButton = document.querySelector('.continue-shopping');
const checkoutButton = document.querySelector('.checkout-btn');
const cartCount = document.querySelector('.cart-count');
const whatsappButton = document.getElementById('whatsappButton');

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeImageBtn = document.querySelector('.close-image');

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartItems() {
    cartItems.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">R$ ${item.price}</span>
            </div>
            <div class="quantity-controls">
                <div class="quantity-buttons">
                    <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                    Remover
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = 'block';
}

function updateQuantity(index, change) {
    const item = cart[index];
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCartCount();
        updateCartItems();
        updateCartTotal();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartItems();
    updateCartTotal();

    if (cart.length === 0) {
        isFirstItem = true;
    }
}

function sendWhatsAppMessage(message) {
    const whatsappNumber = '5544998846587';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function openCart() {
    cartModal.style.display = 'block';
    document.body.classList.add('cart-open');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
}

function closeCart() {
    cartModal.style.display = 'none';
    document.body.classList.remove('cart-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
}

cartButton.addEventListener('click', openCart);

continueShoppingButton.addEventListener('click', closeCart);

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCart();
    }
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = button.dataset.price;
        addToCart(name, price);
    });
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        const message = 'Olá! Gostaria de fazer um pedido de cookies. Poderia me ajudar?';
        sendWhatsAppMessage(message);
        return;
    }

    let message = 'Olá! Gostaria de fazer um pedido:\n\n';
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - R$ ${(parseFloat(item.price) * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal: R$ ${cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}`;

    sendWhatsAppMessage(message);

    cart = [];
    updateCartCount();
    updateCartItems();
    updateCartTotal();
    closeCart();
});

whatsappButton.addEventListener('click', () => {
    if (cart.length === 0) {
        const message = 'Olá! Gostaria de fazer um pedido de cookies. Poderia me ajudar?';
        sendWhatsAppMessage(message);
        return;
    }

    let message = 'Olá! Gostaria de fazer um pedido:\n\n';
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} - R$ ${(parseFloat(item.price) * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal: R$ ${cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2)}`;

    sendWhatsAppMessage(message);
});

function openImageModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeImageBtn.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'flex') {
        closeImageModal();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const items = document.querySelectorAll('.item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filtroBtns.forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');

            const categoria = btn.getAttribute('data-categoria');

            items.forEach(item => {
                if (categoria === 'todos' || item.getAttribute('data-categoria') === categoria) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 
