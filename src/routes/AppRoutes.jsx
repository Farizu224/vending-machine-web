import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductsPage from '../pages/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ExpertSystemPage from '../pages/ExpertSystemPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'
import TransactionStatusPage from '../pages/TransactionStatusPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/expert-system" element={<ExpertSystemPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />
      <Route path="/transaction/:orderId" element={
        <ProtectedRoute>
          <TransactionStatusPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default AppRoutes
