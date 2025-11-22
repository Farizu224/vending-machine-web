import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg">
                
              </div>
              <span className="text-2xl font-display font-bold text-white">
                Jamuin
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Vending machine jamu tradisional Indonesia dengan teknologi AI untuk 
              rekomendasi produk yang sesuai dengan kebutuhan kesehatan Anda.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/TedyPermana24" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-400 transition-colors"
              >
                <FaGithub className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary-400 transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/expert-system" className="hover:text-primary-400 transition-colors">
                  Konsultasi AI
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary-400 transition-colors">
                  Keranjang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaEnvelope />
                <span>info@jamuin.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhone />
                <span>+62 812-3456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Jamuin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
