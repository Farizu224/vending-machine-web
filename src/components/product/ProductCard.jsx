import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="card group cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
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
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {product.nama}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.deskripsi}
        </p>
      </div>
        <div className="flex items-center justify-between px-4 pb-2">
          <span className="text-2xl font-bold text-primary-600">
            {formatCurrency(product.harga)}
          </span>
          <span className="text-sm text-gray-500">
            Stok: {product.stok}
          </span>
        </div>
    </Link>
  )
}

export default ProductCard
