let cart = [];

const cartButton = document.querySelector('.cart-button');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCartButton = document.querySelector('.close-cart');
const checkoutButton = document.querySelector('.checkout-btn');
const cartCount = document.querySelector('.cart-count');
const whatsappButton = document.getElementById('whatsappButton');

// Modal de Imagem
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeImageBtn = document.querySelector('.close-image');

function updateCartCount() {
    cartCount.textContent = cart.length;
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} - R$ ${item.price}</span>
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartItems.appendChild(cartItem);
        total += parseFloat(item.price);
    });

    cartTotal.textContent = total.toFixed(2);
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
}

function sendWhatsAppMessage(message) {
    const whatsappNumber = '5544998221669';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

cartButton.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeCartButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
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
        alert('Seu carrinho está vazio!');
        return;
    }

    let message = 'Olá! Gostaria de fazer um pedido:\n\n';
    let total = 0;

    cart.forEach(item => {
        message += `${item.name} - R$ ${item.price}\n`;
        total += parseFloat(item.price);
    });

    message += `\nTotal: R$ ${total.toFixed(2)}`;

    sendWhatsAppMessage(message);

    cart = [];
    updateCartCount();
    updateCartDisplay();
    cartModal.style.display = 'none';
});

whatsappButton.addEventListener('click', () => {
    const message = 'Olá! Gostaria de fazer um pedido de cookies. Poderia me ajudar?';
    sendWhatsAppMessage(message);
});

// Função para abrir o modal
function openImageModal(imageSrc) {
    modalImage.src = imageSrc;
    imageModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeImageModal() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para fechar o modal
closeImageBtn.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'flex') {
        closeImageModal();
    }
});

// Funcionalidade dos Filtros
document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const items = document.querySelectorAll('.item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe ativo de todos os botões
            filtroBtns.forEach(b => b.classList.remove('ativo'));
            // Adiciona a classe ativo ao botão clicado
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
