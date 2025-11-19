import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaMinus, FaPlus, FaArrowLeft } from 'react-icons/fa'
import { productService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import useCartStore from '../store/useCartStore'
import toast from 'react-hot-toast'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    fetchProductDetail()
  }, [id])

  const fetchProductDetail = async () => {
    try {
      setLoading(true)
      const data = await productService.getProductById(id)
      setProduct(data)
    } catch (error) {
      toast.error('Gagal memuat detail produk')
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${quantity} ${product.nama} ditambahkan ke keranjang`)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Produk tidak ditemukan</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Kembali ke Produk
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <FaArrowLeft />
          <span>Kembali ke Produk</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="p-8">
              <img
                src={product.gambar || 'https://via.placeholder.com/600x400?text=Jamu'}
                alt={product.nama}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-3xl font-display font-bold mb-4">
                {product.nama}
              </h1>

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  {formatCurrency(product.harga)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Deskripsi</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.deskripsi}
                </p>
              </div>

              {product.manfaat && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Manfaat</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.manfaat}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Stok Tersedia:</span>
                  <span className={`font-bold ${product.stok > 5 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {product.stok} pcs
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="font-semibold block mb-2">Jumlah</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    disabled={quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                    disabled={quantity >= product.stok}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stok === 0}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-lg transition-all ${
                  product.stok === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <FaShoppingCart />
                <span>{product.stok === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
