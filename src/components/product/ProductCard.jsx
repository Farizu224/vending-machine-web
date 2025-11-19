import { Link } from 'react-router-dom'
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa'

function ProductCard({ product, onAddToCart }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    onAddToCart(product)
  }

  return (
    <Link to={`/products/${product.id}`} className="card group">
      <div className="relative overflow-hidden">
        <img
          src={product.gambar || 'https://via.placeholder.com/300x200?text=Jamu'}
          alt={product.nama}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stok <= 5 && product.stok > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            Stok Terbatas
          </div>
        )}
        {product.stok === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Habis
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.nama}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.deskripsi}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(product.harga)}
          </span>
          <span className="text-sm text-gray-500">
            Stok: {product.stok}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stok === 0}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-semibold transition-all ${
              product.stok === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <FaShoppingCart />
            <span>{product.stok === 0 ? 'Habis' : 'Tambah'}</span>
          </button>
          
          <button className="p-2 border-2 border-primary-500 text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
            <FaInfoCircle className="text-xl" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
