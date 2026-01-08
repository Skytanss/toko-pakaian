// Load cart items
function loadKeranjang() {
    const container = document.getElementById('keranjangItems');
    const summaryContainer = document.getElementById('keranjangSummary');
    
    if (!container || !summaryContainer) return;
    
    const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    
    // If cart is empty
    if (keranjang.length === 0) {
        container.innerHTML = `
            <div class="keranjang-kosong">
                <i class="fas fa-shopping-cart"></i>
                <h3>Keranjang Belanja Kosong</h3>
                <p>Tambahkan beberapa produk ke keranjang Anda</p>
                <a href="produk.html" class="btn-primary">Belanja Sekarang</a>
            </div>
        `;
        
        summaryContainer.innerHTML = '';
        return;
    }
    
    // Render cart items
    container.innerHTML = '';
    let subtotal = 0;
    
    keranjang.forEach((item, index) => {
        const itemTotal = item.harga * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'keranjang-item';
        itemElement.innerHTML = `
            <div class="item-gambar">
                <img src="${item.gambar}" alt="${item.nama}">
            </div>
            <div class="item-info">
                <div class="item-header">
                    <h3>${item.nama}</h3>
                    <button class="hapus-item" onclick="hapusDariKeranjang(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="item-detail">
                    <div>
                        <div class="item-harga">${formatCurrency(item.harga)}</div>
                        <div class="item-quantity">
                            <button onclick="ubahQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="ubahQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="item-subtotal">${formatCurrency(itemTotal)}</div>
                </div>
            </div>
        `;
        container.appendChild(itemElement);
    });
    
    // Calculate totals
    const ongkir = subtotal > 300000 ? 0 : 15000;
    const total = subtotal + ongkir;
    
    // Render summary
    summaryContainer.innerHTML = `
        <h2>Ringkasan Belanja</h2>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatCurrency(subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Ongkos Kirim</span>
            <span>${ongkir === 0 ? 'GRATIS' : formatCurrency(ongkir)}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>${formatCurrency(total)}</span>
        </div>
        <a href="checkout.html" class="btn-primary" style="width: 100%; text-align: center; margin-top: 20px; display: block;">
            Lanjut ke Pembayaran
        </a>
    `;
}

// Remove item from cart
function hapusDariKeranjang(index) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    keranjang.splice(index, 1);
    localStorage.setItem('keranjang', JSON.stringify(keranjang));
    loadKeranjang();
    updateCartCount();
}

// Update item quantity
function ubahQuantity(index, change) {
    let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
    
    if (keranjang[index]) {
        keranjang[index].quantity += change;
        
        // Remove if quantity is 0 or less
        if (keranjang[index].quantity <= 0) {
            keranjang.splice(index, 1);
        }
        
        localStorage.setItem('keranjang', JSON.stringify(keranjang));
        loadKeranjang();
        updateCartCount();
    }
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('keranjangItems')) {
        loadKeranjang();
    }
});