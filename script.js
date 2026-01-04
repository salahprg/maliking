// Cart functionality
let cart = [];
let total = 0;

// Update cart count in header
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.dataset.price);
        
        cart.push({ name, price });
        total += price;
        updateCart();
        updateCartCount();
        
        // Simple animation feedback
        button.textContent = 'Added!';
        setTimeout(() => button.textContent = 'Add to Cart', 1000);
    });
});

// Update cart display
function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} <button class="remove-btn" data-index="${index}">Remove</button>`;
        cartList.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
    
    // Add remove functionality
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            total -= cart[index].price;
            cart.splice(index, 1);
            updateCart();
            updateCartCount();
        });
    });
}

// Checkout (placeholder)
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert(`Checkout total: $${total.toFixed(2)}. (Integrate with Stripe for real payments.)`);
        cart = [];
        total = 0;
        updateCart();
        updateCartCount();
    }
});