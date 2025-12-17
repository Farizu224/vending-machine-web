import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa'
import useCartStore from '../../store/useCartStore'
import { useAuth } from '../../contexts/AuthContext'
import toast from 'react-hot-toast'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const totalItems = useCartStore(state => state.getTotalItems())
  const { user, logout, isAuthenticated } = useAuth()

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/products', label: 'Produk' },
    { path: '/expert-system', label: 'Konsultasi AI' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    toast.success('Berhasil logout')
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center pb-1">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo-jamuin.png" 
              alt="Jamuin Logo" 
              className="h-16 w-auto"
            />
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

            {/* User Menu */}
            {isAuthenticated() ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-gray-700">{user?.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <FaSignInAlt />
                Login
              </Link>
            )}
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

            {/* Mobile Auth */}
            {isAuthenticated() ? (
              <>
                <div className="px-4 py-2 border-t border-b bg-gray-50">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-4 font-medium text-primary-600 hover:bg-primary-50 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaSignInAlt />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
