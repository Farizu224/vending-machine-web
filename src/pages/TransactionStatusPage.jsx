import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'
import { transactionService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

function TransactionStatusPage() {
  const { orderId } = useParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransactionStatus()
    // Poll every 5 seconds for status updates
    const interval = setInterval(fetchTransactionStatus, 5000)
    return () => clearInterval(interval)
  }, [orderId])

  const fetchTransactionStatus = async () => {
    try {
      const data = await transactionService.getTransactionDetails(orderId)
      setTransaction(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching transaction:', error)
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'settlement':
      case 'capture':
        return <FaCheckCircle className="text-5xl text-green-500" />
      case 'pending':
        return <FaClock className="text-5xl text-yellow-500" />
      case 'cancel':
      case 'deny':
      case 'expire':
        return <FaTimesCircle className="text-5xl text-red-500" />
      default:
        return <FaClock className="text-5xl text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'settlement':
      case 'capture':
        return 'Pembayaran Berhasil'
      case 'pending':
        return 'Menunggu Pembayaran'
      case 'cancel':
        return 'Dibatalkan'
      case 'deny':
        return 'Ditolak'
      case 'expire':
        return 'Kadaluarsa'
      default:
        return 'Status Tidak Diketahui'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'settlement':
      case 'capture':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'cancel':
      case 'deny':
      case 'expire':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Transaksi tidak ditemukan</p>
          <Link to="/" className="btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Status Icon */}
          <div className="text-center mb-8">
            <div className="mb-4">
              {getStatusIcon(transaction.transactionStatus)}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${getStatusColor(transaction.transactionStatus)}`}>
              {getStatusText(transaction.transactionStatus)}
            </h1>
            <p className="text-gray-600">
              Order ID: <span className="font-mono font-semibold">{transaction.orderId}</span>
            </p>
          </div>

          {/* Transaction Info */}
          <div className="border-t border-b py-6 mb-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-600 text-sm mb-1">Tanggal Transaksi</p>
                <p className="font-semibold">{formatDate(transaction.transactionTime)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Pembayaran</p>
                <p className="font-semibold text-primary-600 text-xl">
                  {formatCurrency(transaction.grossAmount)}
                </p>
              </div>
            </div>

            {transaction.paymentType && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-1">Metode Pembayaran</p>
                <p className="font-semibold capitalize">
                  {transaction.paymentType.replace('_', ' ')}
                </p>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Informasi Pembeli</h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Nama:</span>
                <span className="ml-2 font-medium">{transaction.customerName}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{transaction.customerEmail}</span>
              </div>
              <div>
                <span className="text-gray-600">Telepon:</span>
                <span className="ml-2 font-medium">{transaction.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          {transaction.items && transaction.items.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Produk yang Dibeli</h3>
              <div className="space-y-2">
                {transaction.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="btn-outline">
              Belanja Lagi
            </Link>
            <Link to="/" className="btn-primary">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionStatusPage
