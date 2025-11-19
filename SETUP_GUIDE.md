# Setup Guide - Jamuin Web

## Persiapan Awal

### 1. Install Node.js
Pastikan Node.js versi 16 atau lebih tinggi sudah terinstall.

Cek versi:
```bash
node --version
npm --version
```

### 2. Setup Backend API
Sebelum menjalankan aplikasi web, pastikan backend API sudah running.

Clone dan setup backend:
```bash
git clone https://github.com/TedyPermana24/vending-machine-backend.git
cd vending-machine-backend
npm install
npm start
```

Backend akan berjalan di `http://localhost:3000`

### 3. Setup Midtrans Account

1. Daftar di https://midtrans.com
2. Login ke dashboard
3. Pilih environment: **Sandbox** (untuk testing)
4. Copy **Client Key** dan **Server Key**

## Instalasi Aplikasi Web

### Step 1: Install Dependencies

```bash
cd jamuin-web
npm install
```

### Step 2: Environment Configuration

1. Copy file .env.example
```bash
cp .env.example .env
```

2. Edit file `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-XXXXXXXXXXXXXXXX
VITE_MIDTRANS_ENVIRONMENT=sandbox
```

### Step 3: Update Midtrans Client Key

Edit file `index.html`, update client key:
```html
<script type="text/javascript"
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key="SB-Mid-client-XXXXXXXXXXXXXXXX"></script>
```

### Step 4: Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## Verifikasi Setup

### 1. Test Homepage
- Buka `http://localhost:5173`
- Pastikan halaman loading dengan benar
- Cek featured products muncul

### 2. Test Product List
- Navigate ke `/products`
- Pastikan product list loading
- Test search functionality

### 3. Test Expert System
- Navigate ke `/expert-system`
- Jawab beberapa pertanyaan
- Pastikan recommendation muncul

### 4. Test Cart
- Tambah produk ke cart
- Check cart icon badge update
- Navigate ke `/cart`
- Test quantity update

### 5. Test Checkout (Sandbox)
- Lanjut ke checkout
- Isi form data
- Test payment dengan Midtrans sandbox

## Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process

# Atau gunakan port lain
npm run dev -- --port 3001
```

### Backend Connection Error
- Pastikan backend running di port 3000
- Check CORS settings di backend
- Verify VITE_API_BASE_URL di .env

### Midtrans Not Loading
- Verify client key di index.html
- Check browser console untuk errors
- Pastikan internet connection aktif

### Tailwind CSS Not Working
```bash
# Rebuild
npm run build
# Restart dev server
npm run dev
```

## Production Build

### Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deploy Checklist
- [ ] Update environment variables untuk production
- [ ] Change Midtrans to production mode
- [ ] Update API base URL
- [ ] Test all features
- [ ] Check responsive design
- [ ] Optimize images

## Next Steps

1. Customize theme colors di `tailwind.config.js`
2. Add more products via backend
3. Test payment flow end-to-end
4. Deploy to hosting (Vercel, Netlify, dll)

## Support

Jika ada masalah, check:
- Console browser untuk errors
- Network tab untuk API calls
- Backend logs
