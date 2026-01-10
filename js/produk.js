// Product Data
const produkData = [
    {
        id: 1,
        nama: "Kaos Polos Premium",
        deskripsi: "Kaos katun premium dengan bahan nyaman dan desain minimalis.",
        harga: 89000,
        hargaAsli: 120000,
        kategori: "baju",
        gambar: "assets/images/produk1.jpg"
    },
    {
        id: 2,
        nama: "Celana Jeans Slim Fit",
        deskripsi: "Celana jeans slim fit dengan bahan denim berkualitas tinggi.",
        harga: 249000,
        hargaAsli: 299000,
        kategori: "celana",
        gambar: "assets/images/produk2.jpg"
    },
    {
        id: 3,
        nama: "Jam Tangan Classic",
        deskripsi: "Jam tangan dengan desain klasik dan strap kulit asli.",
        harga: 349000,
        hargaAsli: 450000,
        kategori: "aksesoris",
        gambar: "https://via.placeholder.com/300x400/ffd166/000000?text=Jam+Tangan"
    },
    {
        id: 4,
        nama: "Sepatu Sneakers Casual",
        deskripsi: "Sepatu sneakers dengan desain modern dan nyaman dipakai seharian.",
        harga: 299000,
        hargaAsli: 399000,
        kategori: "sepatu",
        gambar: "images/Sepatu-Sneaker-Unisex-dengan-Formstrip-Vulkanisasi-Court-Classic.avifassets/images/produk4.jpg"
    },
    {
        id: 5,
        nama: "Kemeja Flanel Kotak",
        deskripsi: "Kemeja flanel hangat dengan motif kotak-kotak trendi.",
        harga: 159000,
        hargaAsli: 199000,
        kategori: "baju",
        gambar: "assets/images/produk5.jpg"
    },
    {
        id: 6,
        nama: "Celana Chino Slim",
        deskripsi: "Celana chino dengan potongan slim dan bahan stretch.",
        harga: 199000,
        hargaAsli: 259000,
        kategori: "celana",
        gambar: "assets/images/produk6.jpg"
    },
    {
        id: 7,
        nama: "Tas Ransel Outdoor",
        deskripsi: "Tas ransel multifungsi dengan banyak kompartemen.",
        harga: 279000,
        hargaAsli: 359000,
        kategori: "aksesoris",
        gambar: "assets/images/produk7.jpg"
    },
    {
        id: 8,
        nama: "Sepatu Formal Leather",
        deskripsi: "Sepatu formal dari kulit asli dengan desain elegan.",
        harga: 499000,
        hargaAsli: 699000,
        kategori: "sepatu",
        gambar: "assets/images/produk8.jpg"
    }
];

// Load featured products on homepage
function loadProdukUnggulan() {
    const container = document.getElementById('produkUnggulan');
    if (!container) return;
    
    // Get 4 random products
    const shuffled = [...produkData].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, 4);
    
    container.innerHTML = '';
    
    featured.forEach(produk => {
        const card = document.createElement('div');
        card.className = 'produk-card';
        card.innerHTML = `
            <div class="produk-img">
                <img src="${produk.gambar}" alt="${produk.nama}">
            </div>
            <div class="produk-info">
                <h3>${produk.nama}</h3>
                <p class="produk-deskripsi">${produk.deskripsi}</p>
                <div class="produk-harga">
                    <div>
                        <span class="harga">${formatCurrency(produk.harga)}</span>
                        ${produk.hargaAsli ? `<span class="harga-asli">${formatCurrency(produk.hargaAsli)}</span>` : ''}
                    </div>
                    <button class="btn-tambah" onclick="tambahKeKeranjang(${JSON.stringify(produk).replace(/"/g, '&quot;')})">
                        <i class="fas fa-cart-plus"></i> Tambah
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Load products on product page
function loadProduk() {
    const container = document.getElementById('produkContainer');
    if (!container) return;
    
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const kategori = urlParams.get('kategori');
    
    // Filter products
    let filteredProduk = produkData;
    if (kategori) {
        filteredProduk = produkData.filter(p => p.kategori === kategori);
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filtered = filteredProduk.filter(p => 
                p.nama.toLowerCase().includes(searchTerm) || 
                p.deskripsi.toLowerCase().includes(searchTerm)
            );
            renderProduk(container, filtered);
        });
    }
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter products
            let filtered = produkData;
            if (filter !== 'semua') {
                filtered = produkData.filter(p => p.kategori === filter);
            }
            
            renderProduk(container, filtered);
        });
    });
    
    // Initial render
    renderProduk(container, filteredProduk);
}

// Render products to container
function renderProduk(container, products) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<div class="no-products"><p>Tidak ada produk ditemukan.</p></div>';
        return;
    }
    
    products.forEach(produk => {
        const card = document.createElement('div');
        card.className = 'produk-card';
        card.innerHTML = `
            <div class="produk-img">
                <img src="${produk.gambar}" alt="${produk.nama}">
            </div>
            <div class="produk-info">
                <h3>${produk.nama}</h3>
                <p class="produk-deskripsi">${produk.deskripsi}</p>
                <div class="produk-harga">
                    <div>
                        <span class="harga">${formatCurrency(produk.harga)}</span>
                        ${produk.hargaAsli ? `<span class="harga-asli">${formatCurrency(produk.hargaAsli)}</span>` : ''}
                    </div>
                    <div>
                        <button class="btn-tambah" onclick="tambahKeKeranjang(${JSON.stringify(produk).replace(/"/g, '&quot;')})">
                            <i class="fas fa-cart-plus"></i> Tambah
                        </button>
                        <a href="detail-produk.html?id=${produk.id}" class="btn-detail" style="margin-left: 10px; color: var(--secondary-color); font-weight: 600;">
                            <i class="fas fa-eye"></i> Detail
                        </a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Load product detail
function loadDetailProduk() {
    const container = document.getElementById('detailProduk');
    if (!container) return;
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    // Find product
    const produk = produkData.find(p => p.id === productId);
    
    if (!produk) {
        container.innerHTML = '<div class="error"><p>Produk tidak ditemukan.</p></div>';
        return;
    }
    
    container.innerHTML = `
        <div class="detail-gambar">
            <img src="${produk.gambar}" alt="${produk.nama}">
        </div>
        <div class="detail-info">
            <h1>${produk.nama}</h1>
            <div class="detail-harga">
                ${formatCurrency(produk.harga)}
                ${produk.hargaAsli ? `<span class="harga-asli">${formatCurrency(produk.hargaAsli)}</span>` : ''}
            </div>
            <p class="detail-deskripsi">${produk.deskripsi}</p>
            <div class="detail-actions">
                <div class="quantity-selector">
                    <button id="kurangQty">-</button>
                    <input type="number" id="qty" value="1" min="1" max="10">
                    <button id="tambahQty">+</button>
                </div>
                <button class="btn-primary" onclick="tambahKeKeranjangDetail(${productId})">
                    <i class="fas fa-cart-plus"></i> Tambah ke Keranjang
                </button>
            </div>
            <div class="detail-meta">
                <div class="meta-item">
                    <span class="meta-label">Kategori:</span>
                    <span>${produk.kategori}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Ketersediaan:</span>
                    <span style="color: var(--secondary-color);">Tersedia</span>
                </div>
            </div>
        </div>
    `;
    
    // Quantity selector functionality
    const qtyInput = document.getElementById('qty');
    const kurangBtn = document.getElementById('kurangQty');
    const tambahBtn = document.getElementById('tambahQty');
    
    kurangBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value > 1) {
            qtyInput.value = value - 1;
        }
    });
    
    tambahBtn.addEventListener('click', () => {
        let value = parseInt(qtyInput.value);
        if (value < 10) {
            qtyInput.value = value + 1;
        }
    });
}

// Add to cart from detail page
function tambahKeKeranjangDetail(productId) {
    const produk = produkData.find(p => p.id === productId);
    const qty = parseInt(document.getElementById('qty').value);
    
    if (produk) {
        tambahKeKeranjang({
            ...produk,
            quantity: qty
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('produkUnggulan')) {
        loadProdukUnggulan();
    }
    
    if (document.getElementById('produkContainer')) {
        loadProduk();
    }
    
    if (document.getElementById('detailProduk')) {
        loadDetailProduk();
    }

});

