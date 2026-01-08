# toko-pakaian

# Website Toko Pakaian Online - FashionStore

Website toko pakaian online responsif yang dibangun dengan HTML, CSS, dan JavaScript.

## Fitur Utama

1. **Halaman Utama** 
   - Hero section dengan promosi
   - Kategori produk
   - Produk unggulan
   - Fitur toko

2. **Halaman Produk**
   - Grid produk dengan filter kategori
   - Fitur pencarian
   - Pagination (jika diperlukan)

3. **Halaman Detail Produk**
   - Detail lengkap produk
   - Gallery gambar
   - Pilihan ukuran/warna
   - Quantity selector
   - Produk terkait

4. **Keranjang Belanja**
   - Tambah/hapus produk
   - Update quantity
   - Ringkasan belanja
   - Perhitungan otomatis

5. **Checkout**
   - Form pengiriman
   - Pilihan metode pembayaran
   - Ringkasan pesanan
   - Konfirmasi pesanan

6. **Halaman Informasi**
   - Tentang Kami
   - Kontak dengan form
   - FAQ

7. **Fitur Responsif**
   - Mobile-first design
   - Navigation menu mobile
   - Layout adaptif untuk semua ukuran layar

## Struktur File

toko-pakaian/
├── index.html
├── produk.html
├── detail-produk.html
├── keranjang.html
├── checkout.html
├── tentang.html
├── kontak.html
├── css/
│ ├── style.css
│ └── responsive.css
├── js/
│ ├── main.js
│ ├── produk.js
│ ├── keranjang.js
│ └── checkout.js
└── assets/
├── images/ (gambar produk)
└── icons/ (ikon)


## Cara Menggunakan

1. **Clone atau download** semua file ke dalam satu folder
2. **Siapkan gambar produk** di folder `assets/images/` dengan nama:
   - `hero-fashion.png` (untuk hero section)
   - `produk1.jpg` sampai `produk8.jpg` (untuk produk)
   - `team1.jpg` sampai `team4.jpg` (untuk tim, opsional)
3. **Buka file `index.html`** di browser untuk melihat website
4. **Ubah data produk** di file `js/produk.js` sesuai kebutuhan

## Data Produk

Data produk disimpan di `js/produk.js` dalam bentuk array JavaScript. Anda dapat menyesuaikan:
- Nama produk
- Harga
- Deskripsi
- Kategori
- Gambar

## Teknologi yang Digunakan

- **HTML5** untuk struktur halaman
- **CSS3** untuk styling dengan Flexbox dan Grid
- **JavaScript** (ES6) untuk interaktivitas
- **Font Awesome** untuk ikon
- **Google Fonts** untuk tipografi
- **LocalStorage** untuk penyimpanan data sementara

## Fitur Responsif

Website menggunakan pendekatan mobile-first dan memiliki breakpoint:
- **Mobile**: < 576px
- **Tablet**: 576px - 992px
- **Desktop**: > 992px

## Browser Support

Website mendukung browser modern terbaru:
- Chrome 60+
- Firefox 55+
- Safari 10+
- Edge 16+

## Customization

Anda dapat menyesuaikan website dengan mengubah:

1. **Warna** di file `css/style.css` pada bagian `:root`
2. **Font** di bagian atas file HTML
3. **Data produk** di file `js/produk.js`
4. **Logo dan gambar** di folder `assets/`

## Deployment

Untuk men-deploy website ke server:
1. Upload semua file ke hosting
2. Pastikan struktur folder tetap sama
3. Konfigurasi domain jika diperlukan

## License

Proyek ini open source dan dapat dimodifikasi sesuai kebutuhan.

## Kontak

Jika ada pertanyaan atau masalah, silakan hubungi melalui halaman kontak di website.
