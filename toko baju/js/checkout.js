// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize checkout page
    if (document.getElementById('checkoutForm')) {
        loadCheckoutData();
        setupPaymentMethods();
        setupOrderSubmit();
    }
});

// Load checkout data from cart
function loadCheckoutData() {
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    
    if (keranjang.length === 0) {
        // Redirect to cart if empty
        window.location.href = 'keranjang.html';
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    let orderItemsHTML = '';
    
    keranjang.forEach(item => {
        const itemTotal = item.harga * item.quantity;
        subtotal += itemTotal;
        
        orderItemsHTML += `
            <div class="order-item">
                <div>
                    <div class="order-item-name">${item.nama} × ${item.quantity}</div>
                </div>
                <div class="order-item-price">${formatCurrency(itemTotal)}</div>
            </div>
        `;
    });
    
    // Calculate shipping
    const shipping = subtotal > 300000 ? 0 : 15000;
    const total = subtotal + shipping;
    
    // Update order summary
    document.getElementById('orderItems').innerHTML = orderItemsHTML;
    document.getElementById('orderSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('orderShipping').textContent = shipping === 0 ? 'GRATIS' : formatCurrency(shipping);
    document.getElementById('orderTotal').textContent = formatCurrency(total);
    document.getElementById('totalTransfer').textContent = formatCurrency(total);
}

// Setup payment method selection
function setupPaymentMethods() {
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-detail');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Add active class to clicked method
            this.classList.add('active');
            
            // Get selected method
            const selectedMethod = this.dataset.method;
            
            // Hide all payment details
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show selected payment detail
            document.getElementById(`${selectedMethod}Detail`).style.display = 'block';
        });
    });
}

// Setup order submission
function setupOrderSubmit() {
    const submitBtn = document.getElementById('submitOrder');
    const shippingForm = document.getElementById('shippingForm');
    const agreeTerms = document.getElementById('agreeTerms');
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!shippingForm.checkValidity()) {
            alert('Harap isi semua informasi pengiriman dengan lengkap.');
            return;
        }
        
        if (!agreeTerms.checked) {
            alert('Harap setujui syarat dan ketentuan.');
            return;
        }
        
        // Get form data
        const formData = {
            namaLengkap: document.getElementById('namaLengkap').value,
            telepon: document.getElementById('telepon').value,
            email: document.getElementById('email').value,
            alamat: document.getElementById('alamat').value,
            kota: document.getElementById('kota').value,
            kodePos: document.getElementById('kodePos').value,
            catatan: document.getElementById('catatan').value,
            paymentMethod: document.querySelector('.payment-method.active').dataset.method
        };
        
        // Get cart data
        const cartData = JSON.parse(localStorage.getItem('keranjang')) || [];
        
        // Create order object
        const order = {
            id: 'ORD' + Date.now(),
            date: new Date().toISOString(),
            customer: formData,
            items: cartData,
            subtotal: calculateSubtotal(cartData),
            shipping: calculateShipping(cartData),
            total: calculateTotal(cartData),
            status: 'pending'
        };
        
        // Save order to localStorage
        saveOrder(order);
        
        // Clear cart
        localStorage.removeItem('keranjang');
        updateCartCount();
        
        // Show success message
        document.getElementById('checkoutForm').style.display = 'none';
        document.getElementById('checkoutSuccess').style.display = 'block';
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
}

// Calculate subtotal
function calculateSubtotal(cart) {
    return cart.reduce((sum, item) => sum + (item.harga * item.quantity), 0);
}

// Calculate shipping
function calculateShipping(cart) {
    const subtotal = calculateSubtotal(cart);
    return subtotal > 300000 ? 0 : 15000;
}

// Calculate total
function calculateTotal(cart) {
    const subtotal = calculateSubtotal(cart);
    const shipping = calculateShipping(cart);
    return subtotal + shipping;
}

// Save order to localStorage
function saveOrder(order) {
    // Get existing orders or create new array
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Add new order
    orders.push(order);
    
    // Save back to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Log order (in real app, this would be sent to server)
    console.log('Order saved:', order);
}