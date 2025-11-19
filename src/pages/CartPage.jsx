import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import useCartStore from '../store/useCartStore'
import toast from 'react-hot-toast'

function CartPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleRemoveItem = (productId, productName) => {
    removeItem(productId)
    toast.success(`${productName} dihapus dari keranjang`)
  }

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Keranjang masih kosong')
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaShoppingCart className="text-8xl text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Keranjang Belanja Kosong
          </h2>
          <p className="text-gray-500 mb-6">
            Anda belum menambahkan produk ke keranjang
          </p>
          <Link to="/products" className="btn-primary">
            Mulai Belanja
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-4xl font-display font-bold mb-8">
          Keranjang <span className="text-gradient">Belanja</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Produk ({items.length} item)
                </h2>
                <button
                  onClick={() => {
                    clearCart()
                    toast.success('Keranjang dikosongkan')
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Kosongkan Keranjang
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
                  >
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-primary-600 font-bold">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center"
                          disabled={item.quantity >= item.stock}
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>

                      <p className="font-bold text-lg">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Biaya Admin</span>
                  <span className="font-semibold">Gratis</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary-600">
                      {formatCurrency(getTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-primary text-lg py-3"
              >
                Lanjut ke Pembayaran
              </button>

              <Link
                to="/products"
                className="block text-center text-primary-600 hover:text-primary-700 font-medium mt-4"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
