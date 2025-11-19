import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import { GiHerbs } from 'react-icons/gi'
import useCartStore from '../../store/useCartStore'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const totalItems = useCartStore(state => state.getTotalItems())

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/products', label: 'Produk' },
    { path: '/expert-system', label: 'Konsultasi AI' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <GiHerbs className="text-white text-3xl" />
            </div>
            <span className="text-2xl font-display font-bold text-gradient">
              Jamuin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaShoppingCart className="text-2xl text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-4 font-medium ${
                  isActive(link.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center justify-between py-2 px-4 font-medium text-gray-600 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>Keranjang</span>
              {totalItems > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
