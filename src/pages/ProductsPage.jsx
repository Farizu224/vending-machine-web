import { useState, useEffect } from 'react'
import { FaSearch, FaFilter } from 'react-icons/fa'
import { productService } from '../api/services'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useCartStore from '../store/useCartStore'
import toast from 'react-hot-toast'

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await productService.getAllProducts()
      setProducts(data)
    } catch (error) {
      toast.error('Gagal memuat produk')
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    addItem(product, 1)
    toast.success(`${product.nama} ditambahkan ke keranjang`)
  }

  const filteredProducts = products.filter(product =>
    product.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-2">
            <span className="text-gray-900">Katalog Produk</span>
          </h1>
          <p className="text-gray-600">
            Temukan jamu tradisional yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button className="btn-outline flex items-center gap-2">
              <FaFilter />
              Filter
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Menampilkan {filteredProducts.length} produk
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Produk tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
