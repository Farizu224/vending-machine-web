import axiosInstance from './axiosInstance'

export const productService = {
  // Get all products
  getAllProducts: async () => {
    return await axiosInstance.get('/products')
  },

  // Get product by ID
  getProductById: async (id) => {
    return await axiosInstance.get(`/products/${id}`)
  },

  // Search products
  searchProducts: async (query) => {
    return await axiosInstance.get('/products', {
      params: { search: query }
    })
  },
}

export const expertSystemService = {
  // Initialize expert system
  initialize: async () => {
    return await axiosInstance.post('/expert-system/initialize')
  },

  // Start diagnosis
  start: async () => {
    return await axiosInstance.get('/expert-system/start')
  },

  // Submit diagnosis answer
  diagnose: async (data) => {
    return await axiosInstance.post('/expert-system/diagnose', data)
  },
}

export const transactionService = {
  // Create transaction
  createTransaction: async (data) => {
    return await axiosInstance.post('/payments/create', data)
  },

  // Get transaction status
  getTransactionStatus: async (orderId) => {
    return await axiosInstance.get(`/payments/status/${orderId}`)
  },

  // Get transaction details
  getTransactionDetails: async (orderId) => {
    return await axiosInstance.get(`/payments/transaction/${orderId}`)
  },
}
