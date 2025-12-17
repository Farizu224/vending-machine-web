import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../api/services'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const response = await authService.login({ email, password })
    
    console.log('Login response:', response)
    
    // Save token and user data - handle both direct and nested response
    const token = response.access_token || response.accessToken || response.token
    const userData = response.user || response
    
    if (token) {
      localStorage.setItem('access_token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      console.log('Token saved:', token)
    } else {
      console.error('No token in response:', response)
      throw new Error('Login berhasil tapi tidak mendapat token')
    }
    
    return response
  }

  const register = async (data) => {
    const response = await authService.register(data)
    
    console.log('Register response:', response)
    
    // Auto login after register - handle both direct and nested response
    const token = response.access_token || response.accessToken || response.token
    const userData = response.user || response
    
    if (token) {
      localStorage.setItem('access_token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      console.log('Token saved after register:', token)
    }
    
    return response
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('access_token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
