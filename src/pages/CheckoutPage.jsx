import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCreditCard } from 'react-icons/fa'
import useCartStore from '../store/useCartStore'
import { transactionService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, getTotal, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      toast.error('Mohon lengkapi semua data')
      return
    }

    try {
      setLoading(true)

      // Prepare transaction data
      const transactionData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getTotal(),
      }

      const response = await transactionService.createTransaction(transactionData)

      // Open Midtrans Snap
      if (window.snap && response.snapToken) {
        window.snap.pay(response.snapToken, {
          onSuccess: function(result) {
            clearCart()
            navigate(`/transaction/${response.orderId}`)
          },
          onPending: function(result) {
            navigate(`/transaction/${response.orderId}`)
          },
          onError: function(result) {
            toast.error('Pembayaran gagal')
          },
          onClose: function() {
            toast.info('Pembayaran dibatalkan')
          }
        })
      } else {
        // Fallback if Snap.js not loaded
        toast.error('Payment gateway tidak tersedia')
      }
    } catch (error) {
      toast.error('Gagal membuat transaksi: ' + error.message)
      console.error('Checkout error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-display font-bold mb-8">
          <span className="text-gray-900">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Data Pembeli</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Masukkan nama lengkap"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Nomor Telepon *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="08123456789"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-lg"
                >
                  {loading ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    <>
                      <FaCreditCard />
                      <span>Bayar Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 top-24">
              <h2 className="text-xl font-semibold mb-4">Ringkasan Pesanan</h2>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Kuantitas
                    </span>
                    <span className="text-gray-600">
                      {item.name} x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary-600">
                    {formatCurrency(getTotal())}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Metode Pembayaran:</strong>
                  <br />
                  QRIS, Transfer Bank, E-Wallet, dan lainnya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
