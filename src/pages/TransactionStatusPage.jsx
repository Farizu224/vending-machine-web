import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'
import { transactionService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

function TransactionStatusPage() {
  const { orderId } = useParams()
  const [searchParams] = useSearchParams()
  const [transaction, setTransaction] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Log Midtrans redirect params
    const order_id = searchParams.get('order_id')
    const status_code = searchParams.get('status_code')
    const transaction_status = searchParams.get('transaction_status')
    
    console.log('Midtrans Redirect Params:', {
      order_id,
      status_code,
      transaction_status,
      orderId
    })

    // First check status from Midtrans API to sync
    checkStatusFromMidtrans()
    
    // Then poll every 3 seconds for status updates (max 10 times)
    let pollCount = 0
    const maxPolls = 10
    const interval = setInterval(() => {
      pollCount++
      if (pollCount >= maxPolls) {
        clearInterval(interval)
      } else {
        fetchTransactionStatus()
      }
    }, 3000)
    
    return () => clearInterval(interval)
  }, [orderId])

  const checkStatusFromMidtrans = async () => {
    try {
      console.log('🔄 Checking status from Midtrans API:', orderId)
      // This endpoint will check Midtrans API and update database
      const data = await transactionService.getTransactionStatus(orderId)
      console.log('✅ Status synced from Midtrans:', data)
      setTransaction(data)
      setLoading(false)
      
      // Show success message if payment successful
      const statusLower = (data.status || '').toLowerCase()
      if (statusLower === 'success' || statusLower === 'settlement') {
        toast.success('Pembayaran berhasil! Produk akan segera diproses.')
      }
    } catch (error) {
      console.error('❌ Error checking status from Midtrans:', error)
      // Fallback to database data
      fetchTransactionStatus()
    }
  }

  const fetchTransactionStatus = async () => {
    try {
      console.log('📥 Fetching transaction from database:', orderId)
      const data = await transactionService.getTransactionDetails(orderId)
      console.log('Transaction data received:', data)
      setTransaction(data)
      setLoading(false)
      
      // Show success message if payment successful
      const statusLower = (data.status || '').toLowerCase()
      if (statusLower === 'success' || statusLower === 'settlement') {
        toast.success('Pembayaran berhasil! Produk akan segera diproses.')
      }
    } catch (error) {
      console.error('Error fetching transaction:', error)
      toast.error('Gagal memuat detail transaksi')
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
    const statusLower = (status || '').toLowerCase()
    switch (statusLower) {
      case 'settlement':
      case 'capture':
      case 'success':
        return <FaCheckCircle className="text-5xl text-green-500" />
      case 'pending':
        return <FaClock className="text-5xl text-yellow-500" />
      case 'cancel':
      case 'cancelled':
      case 'deny':
      case 'expire':
      case 'expired':
      case 'failed':
        return <FaTimesCircle className="text-5xl text-red-500" />
      default:
        return <FaClock className="text-5xl text-gray-500" />
    }
  }

  const getStatusText = (status) => {
    const statusLower = (status || '').toLowerCase()
    switch (statusLower) {
      case 'settlement':
      case 'capture':
      case 'success':
        return 'Pembayaran Berhasil'
      case 'pending':
        return 'Menunggu Pembayaran'
      case 'cancel':
      case 'cancelled':
        return 'Dibatalkan'
      case 'deny':
        return 'Ditolak'
      case 'expire':
      case 'expired':
        return 'Kadaluarsa'
      case 'failed':
        return 'Gagal'
      default:
        return 'Status Tidak Diketahui'
    }
  }

  const getStatusColor = (status) => {
    const statusLower = (status || '').toLowerCase()
    switch (statusLower) {
      case 'settlement':
      case 'capture':
      case 'success':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'cancel':
      case 'cancelled':
      case 'deny':
      case 'expire':
      case 'expired':
      case 'failed':
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
              {getStatusIcon(transaction.status)}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${getStatusColor(transaction.status)}`}>
              {getStatusText(transaction.status)}
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
                <p className="font-semibold">{formatDate(transaction.createdAt)}</p>
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
                  {transaction.paymentType.replace(/_/g, ' ')}
                </p>
              </div>
            )}
            
            {transaction.paidAt && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-1">Waktu Pembayaran</p>
                <p className="font-semibold text-green-600">{formatDate(transaction.paidAt)}</p>
              </div>
            )}
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Informasi Pembeli</h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Nama:</span>
                <span className="ml-2 font-medium">{transaction.user?.name || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{transaction.user?.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-gray-600">Telepon:</span>
                <span className="ml-2 font-medium">{transaction.user?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          {transaction.product && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Produk yang Dibeli</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                {transaction.product.gambar && (
                  <img 
                    src={transaction.product.gambar} 
                    alt={transaction.product.nama}
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80?text=No+Image'
                    }}
                  />
                )}
                <div className="flex-1 ml-4">
                  <p className="font-semibold text-lg">{transaction.product.nama}</p>
                  <p className="text-sm text-gray-600">Jumlah: {transaction.quantity} item</p>
                  <p className="text-sm text-gray-600">Harga satuan: {formatCurrency(transaction.product.harga)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="font-bold text-xl text-primary-600">
                    {formatCurrency(transaction.grossAmount)}
                  </p>
                </div>
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
