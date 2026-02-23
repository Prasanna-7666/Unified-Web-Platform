/**
 * Unified Platform - E-commerce Cart Engine
 * Handles cart state, localStorage persistence, and UI updates.
 */

const CartEngine = (function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartBadge();
        // Dispatch custom event for pages to listen to
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    };

    const updateCartBadge = () => {
        const badges = document.querySelectorAll('.cart-badge');
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        badges.forEach(badge => {
            badge.innerText = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        });
    };

    const addItem = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        showToast(`${product.name} added to cart!`);
    };

    const removeItem = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
    };

    const updateQuantity = (productId, quantity) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            saveCart();
        }
    };

    const clearCart = () => {
        cart = [];
        saveCart();
    };

    const showToast = (message) => {
        // Simple toast implementation or use a library
        const toast = document.createElement('div');
        toast.className = 'cart-toast shadow-lg';
        toast.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${message}`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    };

    return {
        getCart: () => cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        updateCartBadge,
        getCartTotal: () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
})();

// Initialize Cart UI on load
document.addEventListener('DOMContentLoaded', () => {
    CartEngine.updateCartBadge();

    // Delegate "Add to Cart" button clicks
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-add-to-cart');
        if (btn) {
            e.preventDefault();
            const product = {
                id: btn.getAttribute('data-id'),
                name: btn.getAttribute('data-name'),
                price: parseFloat(btn.getAttribute('data-price')),
                image: btn.getAttribute('data-image')
            };
            CartEngine.addItem(product);
        }
    });
});
