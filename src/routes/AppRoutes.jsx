import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ExpertSystemPage from '../pages/ExpertSystemPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import TransactionStatusPage from '../pages/TransactionStatusPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/expert-system" element={<ExpertSystemPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/transaction/:orderId" element={<TransactionStatusPage />} />
    </Routes>
  )
}

export default AppRoutes
