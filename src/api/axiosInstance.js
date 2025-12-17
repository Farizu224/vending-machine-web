import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach JWT token if available
    try {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
        console.log('✅ Token attached to request:', config.url, 'Token:', token.substring(0, 20) + '...')
      } else {
        console.warn('⚠️ No token found for request:', config.url)
      }
    } catch (error) {
      console.error('❌ Error attaching token:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Some NestJS endpoints may wrap data; normalize if needed
    return response.data
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn('⚠️ Unauthorized - clearing token')
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      // Optionally redirect to login
      // window.location.href = '/login'
    }
    
    const message = error.response?.data?.message || error.message || 'Terjadi kesalahan'
    return Promise.reject(new Error(message))
  }
)

export default axiosInstance
