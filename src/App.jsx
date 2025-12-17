import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
        
        {/* Main Content - flex-grow agar mengisi ruang */}
        <main className="flex-grow">
          <AppRoutes />
        </main>

        <Footer />
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4caf50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
      </AuthProvider>
    </Router>
  )
}

export default App
