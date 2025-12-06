import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch, FaLightbulb, FaShoppingBag } from 'react-icons/fa'
import { Gi3DGlasses, GiHealthNormal } from 'react-icons/gi'
import ProductCard from '../components/product/ProductCard'

// Data produk dummy
const DUMMY_PRODUCTS = [
  {
    id: 1,
    nama: 'Jamu Kunyit Asam',
    harga: 15000,
    gambar: 'https://images.unsplash.com/photo-1505944357768-b0a8e6d1e9d8?w=400',
    deskripsi: 'Menyegarkan dan baik untuk kesehatan wanita.',
  },
  {
    id: 2,
    nama: 'Jamu Beras Kencur',
    harga: 12000,
    gambar: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400',
    deskripsi: 'Meningkatkan stamina dan nafsu makan.',
  },
  {
    id: 3,
    nama: 'Jamu Temulawak',
    harga: 17000,
    gambar: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400',
    deskripsi: 'Baik untuk pencernaan dan hati.',
  },
  {
    id: 4,
    nama: 'Jamu Cabe Puyang',
    harga: 13000,
    gambar: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?w=400',
    deskripsi: 'Meredakan pegal dan nyeri otot.',
  },
  {
    id: 5,
    nama: 'Jamu Sinom',
    harga: 14000,
    gambar: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400',
    deskripsi: 'Menyegarkan dan kaya antioksidan.',
  },
  {
    id: 6,
    nama: 'Jamu Pahitan',
    harga: 16000,
    gambar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    deskripsi: 'Baik untuk detoks dan kesehatan kulit.',
  },
]

function HomePage() {
  const [featuredProducts] = useState(DUMMY_PRODUCTS)

  const features = [
    {
      icon: <FaLightbulb className="text-4xl" />,
      title: 'Konsultasi AI',
      description: 'Sistem pakar berbasis AI untuk rekomendasi produk yang tepat',
    },
    {
      icon: <Gi3DGlasses className="text-4xl" />,
      title: 'Jamu Berkualitas',
      description: 'Produk jamu tradisional pilihan dengan khasiat terbaik',
    },
    {
      icon: <FaShoppingBag className="text-4xl" />,
      title: 'Belanja Mudah',
      description: 'Proses pembelian yang cepat dan aman dengan berbagai metode pembayaran',
    },
    {
      icon: <GiHealthNormal className="text-4xl" />,
      title: 'Kesehatan Optimal',
      description: 'Solusi alami untuk berbagai keluhan kesehatan Anda',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold mb-6">
                <span className="text-gradient">Jamuin</span>
                <br />
                <span className="text-gray-800">Vending Machine Jamu Tradisional</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Temukan jamu tradisional Indonesia yang tepat untuk kesehatan Anda
                dengan bantuan teknologi AI modern.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/expert-system" className="btn-primary">
                  <FaLightbulb className="inline mr-2" />
                  Konsultasi AI
                </Link>
                <Link to="/products" className="btn-outline">
                  <FaSearch className="inline mr-2" />
                  Lihat Produk
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
                <img
                  src="/racikan-jamu.jpg"
                  alt="Jamu Tradisional"
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Mengapa Memilih <span className="text-gradient">Jamuin</span>?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 card hover:scale-105 transition-transform">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-display font-bold">
              Produk <span className="text-gradient">Unggulan</span>
            </h2>
            <Link to="/products" className="btn-outline">
              Lihat Semua
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Cara <span className="text-gradient">Berbelanja</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Konsultasi atau Pilih Produk</h3>
              <p className="text-gray-600">
                Gunakan fitur konsultasi AI atau langsung pilih produk yang Anda inginkan
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Tambah ke Keranjang</h3>
              <p className="text-gray-600">
                Tambahkan produk pilihan Anda ke keranjang belanja
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-bold text-xl mb-2">Checkout & Bayar</h3>
              <p className="text-gray-600">
                Selesaikan pembayaran dengan berbagai metode yang tersedia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Siap Merasakan Khasiat Jamu Tradisional?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Dapatkan rekomendasi produk yang tepat untuk kebutuhan kesehatan Anda
          </p>
          <Link to="/expert-system" className="btn-secondary text-lg">
            <FaLightbulb className="inline mr-2" />
            Mulai Konsultasi AI
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage
