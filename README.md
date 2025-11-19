# Jamuin Web - Vending Machine Jamu Tradisional

Aplikasi web untuk sistem vending machine jamu tradisional Indonesia dengan fitur AI consultation, katalog produk, keranjang belanja, dan integrasi pembayaran Midtrans.

## 🌟 Fitur Utama

### 1. AI Consultation (Expert System)
- Sistem pakar berbasis Forward Chaining
- Rekomendasi produk personal berdasarkan keluhan kesehatan
- Interface Q&A yang user-friendly dengan progress tracking
- Ringkasan konsultasi

### 2. Katalog Produk
- Grid layout modern dengan card design
- Detail produk dengan gambar dan deskripsi lengkap
- Informasi harga dan stok real-time
- Search dan filter produk
- Responsive design untuk semua device

### 3. Keranjang Belanja
- Tambah/hapus produk ke keranjang
- Update quantity produk dengan increment/decrement
- Kalkulasi total harga otomatis
- Persistent cart state dengan Zustand
- Order summary yang jelas

### 4. Checkout & Pembayaran
- Form data pembeli yang simple dan clean
- Integrasi Midtrans Payment Gateway (Snap.js)
- Multiple payment methods (QRIS, Bank Transfer, E-Wallet, dll)
- Loading state saat proses pembayaran

### 5. Status Transaksi
- Real-time transaction status tracking
- Detail transaksi lengkap
- Auto-refresh setiap 5 detik
- Status visual dengan icon dan warna

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **State Management**: Zustand (dengan persist middleware)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Payment**: Midtrans Snap.js

## 📦 Instalasi

### Prerequisites
- Node.js (v16 atau lebih tinggi)
- npm atau yarn
- Backend API sudah running

### Langkah Instalasi

1. Install dependencies
```bash
npm install
```

2. Setup environment variables
```bash
cp .env.example .env
```

Edit file `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MIDTRANS_CLIENT_KEY=YOUR_MIDTRANS_CLIENT_KEY
```

3. Update Midtrans Client Key di `index.html`

4. Run development server
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🔌 API Endpoints

Backend: https://github.com/TedyPermana24/vending-machine-backend

- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /expert-system/start` - Start diagnosis
- `POST /expert-system/diagnose` - Submit answer
- `POST /payments/create` - Create transaction
- `GET /payments/status/:orderId` - Get status
- `GET /payments/transaction/:orderId` - Get details

## 🌐 Perbedaan dengan Mobile App

- **Layout**: Grid layout vs single column
- **Navigation**: Top navbar vs bottom navigation
- **UI**: Hover states, larger cards, mouse-optimized
- **UX**: Keyboard shortcuts, multi-column layouts

Mobile App: https://github.com/TedyPermana24/vending-machine-mobile

## 🚀 Build & Deploy

```bash
npm run build
npm run preview
```
