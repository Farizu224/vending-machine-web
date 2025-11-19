# Jamuin Web - Quick Start Guide

## 🚀 Quick Start (5 Menit)

### 1. Install Dependencies
```bash
cd jamuin-web
npm install
```

### 2. Setup Environment
File `.env` sudah dibuat, update jika perlu:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MIDTRANS_CLIENT_KEY=YOUR_KEY_HERE
```

### 3. Start Backend
Pastikan backend sudah running di `http://localhost:3000`

Repository: https://github.com/TedyPermana24/vending-machine-backend

### 4. Run Web App
```bash
npm run dev
```

Buka browser: `http://localhost:5173`

## ✅ Fitur yang Sudah Dibuat

### 1. **Homepage** (`/`)
- Hero section dengan CTA buttons
- Features showcase (4 fitur utama)
- Featured products (6 produk)
- How it works section
- Call-to-action section

### 2. **Products Page** (`/products`)
- Grid layout produk (responsive)
- Search functionality
- Filter button (UI ready)
- Product count display
- Add to cart dari card

### 3. **Product Detail** (`/products/:id`)
- Large product image
- Product information lengkap
- Quantity selector (+/-)
- Add to cart button
- Stock indicator
- Back navigation

### 4. **Expert System** (`/expert-system`)
- AI consultation flow
- Question-answer interface
- Progress tracking
- Previous answers display
- Product recommendation
- Consultation summary
- Reset & restart functionality

### 5. **Shopping Cart** (`/cart`)
- Cart items list dengan images
- Quantity controls per item
- Remove item functionality
- Clear cart option
- Order summary sidebar
- Total calculation
- Empty cart state

### 6. **Checkout** (`/checkout`)
- Customer form (name, email, phone)
- Order summary sidebar
- Midtrans Snap integration
- Loading states
- Validation

### 7. **Transaction Status** (`/transaction/:orderId`)
- Transaction status display
- Visual status indicators
- Customer information
- Items purchased
- Payment details
- Auto-refresh (5 detik)
- Multiple status handling

### 8. **Navigation & Layout**
- Responsive navbar dengan cart badge
- Mobile hamburger menu
- Footer dengan links
- Sticky navigation
- Toast notifications

## 🎨 Design System

### Warna
- **Primary**: Orange (#f79f17 - #d68508)
- **Secondary**: Green (#4caf50)
- **Background**: Gray-50

### Typography
- **Heading**: Poppins (bold, display)
- **Body**: Inter (regular)

### Components
- Cards dengan hover effects
- Buttons (primary, secondary, outline)
- Input fields dengan focus states
- Loading spinners
- Gradients

## 📱 Perbedaan dari Mobile App

### Layout
✅ **Mobile**: Single column, vertical
✅ **Web**: Multi-column grid, horizontal

### Navigation
✅ **Mobile**: Bottom navigation
✅ **Web**: Top navbar

### UI Elements
✅ **Mobile**: Compact cards, FAB
✅ **Web**: Larger cards, hover states

### Interactions
✅ **Mobile**: Touch gestures
✅ **Web**: Mouse hover, keyboard

## 🔌 API Integration

Semua endpoint sama dengan mobile app:

```javascript
// Products
GET /products
GET /products/:id

// Expert System
GET /expert-system/start
POST /expert-system/diagnose

// Payments
POST /payments/create
GET /payments/status/:orderId
GET /payments/transaction/:orderId
```

## 🛠 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build tool (fast!)
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icons

## 📂 Struktur Folder

```
jamuin-web/
├── src/
│   ├── api/              # API services
│   ├── components/       # Reusable components
│   │   ├── common/
│   │   ├── layout/
│   │   └── product/
│   ├── pages/           # Page components
│   ├── routes/          # Route configuration
│   ├── store/           # Zustand stores
│   └── index.css        # Global styles
├── public/              # Static assets
└── index.html          # Entry HTML
```

## 🎯 Testing Checklist

- [x] Homepage loads
- [x] Products page dengan search
- [x] Product detail
- [x] Add to cart
- [x] Cart management
- [x] Expert system flow
- [x] Checkout form
- [x] Midtrans integration (need backend)
- [x] Transaction status
- [x] Responsive design
- [x] Navigation
- [x] Toast notifications

## 🔧 Kustomisasi

### Update Warna
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { ... },
  secondary: { ... }
}
```

### Update Logo
Replace di `Navbar.jsx` dan `Footer.jsx`

### Update Midtrans
1. Daftar di Midtrans
2. Update client key di `index.html`
3. Update `.env` file

## 📚 Dokumentasi Lengkap

- `README.md` - Overview dan instalasi
- `SETUP_GUIDE.md` - Panduan setup detail
- `WEB_VS_MOBILE.md` - Perbandingan web vs mobile

## 🌐 Links

- **Mobile App**: https://github.com/TedyPermana24/vending-machine-mobile
- **Backend**: https://github.com/TedyPermana24/vending-machine-backend

## ⚡ Tips

1. **Development**: Gunakan `npm run dev`
2. **Build**: Gunakan `npm run build`
3. **Preview Build**: Gunakan `npm run preview`
4. **Hot Reload**: Vite sangat cepat!
5. **Browser DevTools**: Check console untuk errors

## 🎉 Selesai!

Web app sudah siap digunakan! Pastikan backend running, lalu:

```bash
npm run dev
```

Visit: `http://localhost:5173`

Happy coding! 🚀
