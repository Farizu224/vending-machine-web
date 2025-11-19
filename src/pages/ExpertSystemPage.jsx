import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaLightbulb, FaCheckCircle } from 'react-icons/fa'
import { expertSystemService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

function ExpertSystemPage() {
  const [sessionId, setSessionId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState([])

  useEffect(() => {
    initializeExpertSystem()
  }, [])

  const initializeExpertSystem = async () => {
    try {
      setLoading(true)
      const startData = await expertSystemService.start()
      setSessionId(startData.sessionId)
      setCurrentQuestion(startData.question)
    } catch (error) {
      toast.error('Gagal memulai konsultasi')
      console.error('Error initializing expert system:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = async (answer) => {
    try {
      setLoading(true)
      setAnswers([...answers, { question: currentQuestion, answer }])

      const response = await expertSystemService.diagnose({
        sessionId,
        answer,
      })

      if (response.recommendation) {
        setRecommendation(response.recommendation)
        setCurrentQuestion(null)
      } else if (response.question) {
        setCurrentQuestion(response.question)
      }
    } catch (error) {
      toast.error('Gagal memproses jawaban')
      console.error('Error submitting answer:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetConsultation = () => {
    setSessionId(null)
    setCurrentQuestion(null)
    setRecommendation(null)
    setAnswers([])
    initializeExpertSystem()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gradient-primary rounded-full mb-4">
            <FaLightbulb className="text-4xl text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">
            Konsultasi <span className="text-gradient">AI</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Dapatkan rekomendasi produk jamu yang sesuai dengan keluhan kesehatan Anda
          </p>
        </div>

        {loading && !currentQuestion && !recommendation ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <LoadingSpinner size="large" />
            <p className="text-gray-600 mt-4">Memuat konsultasi...</p>
          </div>
        ) : recommendation ? (
          /* Recommendation Result */
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Rekomendasi Produk</h2>
              <p className="text-gray-600">
                Berdasarkan jawaban Anda, berikut produk yang kami rekomendasikan:
              </p>
            </div>

            {/* Consultation Summary */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-4">Ringkasan Konsultasi:</h3>
              <div className="space-y-2">
                {answers.map((item, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-gray-600">Q: {item.question}</span>
                    <br />
                    <span className="font-medium">A: {item.answer}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Product */}
            <div className="mb-6">
              <div className="card">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{recommendation.productName}</h3>
                  <p className="text-gray-600 mb-4">{recommendation.description}</p>
                  <p className="text-primary-600 font-semibold mb-4">
                    <strong>Alasan:</strong> {recommendation.reason}
                  </p>
                  <Link
                    to={`/products/${recommendation.productId}`}
                    className="btn-primary inline-block"
                  >
                    Lihat Produk
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={resetConsultation} className="btn-outline">
                Konsultasi Lagi
              </button>
              <Link to="/products" className="btn-primary">
                Lihat Semua Produk
              </Link>
            </div>
          </div>
        ) : currentQuestion ? (
          /* Question Card */
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">
                  Pertanyaan {answers.length + 1}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all"
                  style={{ width: `${((answers.length + 1) / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Previous Answers */}
            {answers.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Jawaban sebelumnya:</p>
                <div className="space-y-1">
                  {answers.slice(-2).map((item, index) => (
                    <p key={index} className="text-sm">
                      <span className="font-medium">{item.answer}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Current Question */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{currentQuestion}</h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              <button
                onClick={() => handleAnswer('Ya')}
                disabled={loading}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left font-medium disabled:opacity-50"
              >
                Ya
              </button>
              <button
                onClick={() => handleAnswer('Tidak')}
                disabled={loading}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left font-medium disabled:opacity-50"
              >
                Tidak
              </button>
            </div>

            {loading && (
              <div className="mt-6 text-center">
                <LoadingSpinner size="medium" />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ExpertSystemPage
