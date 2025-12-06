import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaLightbulb, FaCheckCircle, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa'
import { expertSystemService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

function ExpertSystemPage() {
  const [sessionId, setSessionId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState([])
  const [questionHistory, setQuestionHistory] = useState([])

  useEffect(() => {
    initializeExpertSystem()
  }, [])

  const initializeExpertSystem = async () => {
    try {
      setLoading(true)
      const startData = await expertSystemService.start()
      setSessionId(startData.sessionId)
      setCurrentQuestion(startData.nextQuestion?.text || startData.question)
      setCurrentQuestionId(startData.nextQuestion?.id)
      setQuestionHistory([{
        questionId: startData.nextQuestion?.id,
        question: startData.nextQuestion?.text || startData.question
      }])
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
      const newAnswers = [...answers, { question: currentQuestion, answer }]
      setAnswers(newAnswers)

      const selectedOptionId = answer === 'Ya' 
        ? `${currentQuestionId}_yes` 
        : `${currentQuestionId}_no`

      const response = await expertSystemService.diagnose({
        sessionId,
        questionId: currentQuestionId,
        selectedOptionId,
      })

      if (response.isComplete && response.recommendation) {
        setRecommendation(response.recommendation)
        setCurrentQuestion(null)
        setCurrentQuestionId(null)
      } else if (response.nextQuestion) {
        setCurrentQuestion(response.nextQuestion.text)
        setCurrentQuestionId(response.nextQuestion.id)
        setQuestionHistory([...questionHistory, {
          questionId: response.nextQuestion.id,
          question: response.nextQuestion.text
        }])
      }
    } catch (error) {
      toast.error('Gagal memproses jawaban')
      console.error('Error submitting answer:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (answers.length === 0) return
    
    const newAnswers = [...answers]
    newAnswers.pop()
    setAnswers(newAnswers)
    
    const newHistory = [...questionHistory]
    newHistory.pop()
    setQuestionHistory(newHistory)
    
    if (newHistory.length > 0) {
      const previousQuestion = newHistory[newHistory.length - 1]
      setCurrentQuestion(previousQuestion.question)
      setCurrentQuestionId(previousQuestion.questionId)
    }
  }

  const resetConsultation = () => {
    setSessionId(null)
    setCurrentQuestion(null)
    setCurrentQuestionId(null)
    setRecommendation(null)
    setAnswers([])
    setQuestionHistory([])
    initializeExpertSystem()
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4">
            <span className="text-gray-900">Konsultasi AI</span>
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
          <div className="max-w-4xl mx-auto">
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
                    <div key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary-600 font-medium">{index + 1}.</span>
                      <div className="flex-1">
                        <span className="text-gray-600">{item.question}</span>
                        <br />
                        <span className="font-medium text-gray-800">{item.answer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Product */}
              <div className="mb-6">
                <div className="card">
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{recommendation.productName}</h3>
                    <p className="text-gray-600 mb-4 whitespace-pre-line">{recommendation.alasan}</p>
                    <Link
                      to={`/products/${recommendation.productId}`}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
                    >
                      Lihat Produk
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={resetConsultation} 
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
                >
                  Konsultasi Lagi
                </button>
                <Link 
                  to="/products" 
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Lihat Semua Produk
                </Link>
              </div>
            </div>
          </div>
        ) : currentQuestion ? (
          /* Question Layout with Sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Left Sidebar - History */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-primary-600" />
                  Riwayat Jawaban
                </h3>
                {answers.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">
                    Belum ada jawaban
                  </p>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {answers.map((item, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg border border-primary-100"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className="bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <p className="text-sm text-gray-700 font-medium flex-1">
                            {item.question}
                          </p>
                        </div>
                        <div className="ml-8 flex items-center gap-2">
                          {item.answer === 'Ya' ? (
                            <FaCheck className="text-green-600 text-sm" />
                          ) : (
                            <FaTimes className="text-red-600 text-sm" />
                          )}
                          <span className={`font-semibold text-sm ${
                            item.answer === 'Ya' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {item.answer}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content - Question */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Progress Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">
                      Pertanyaan {answers.length + 1} dari 11
                    </span>
                    <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                      {Math.round(((answers.length + 1) / 11) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((answers.length + 1) / 11) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-8 text-gray-800 leading-relaxed">
                    {currentQuestion}
                  </h2>

                  {/* Answer Buttons - Fixed Position */}
                  <div className="space-y-4">
                    <button
                      onClick={() => handleAnswer('Ya')}
                      disabled={loading}
                      className="w-full group relative overflow-hidden p-6 border-2 border-green-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all text-left font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-full flex items-center justify-center transition-colors">
                            <FaCheck className="text-green-600 group-hover:text-white text-xl transition-colors" />
                          </div>
                          <span className="text-gray-700 group-hover:text-green-700">Ya</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-green-500">→</span>
                      </div>
                    </button>

                    <button
                      onClick={() => handleAnswer('Tidak')}
                      disabled={loading}
                      className="w-full group relative overflow-hidden p-6 border-2 border-red-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all text-left font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 group-hover:bg-red-500 rounded-full flex items-center justify-center transition-colors">
                            <FaTimes className="text-red-600 group-hover:text-white text-xl transition-colors" />
                          </div>
                          <span className="text-gray-700 group-hover:text-red-700">Tidak</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-red-500">→</span>
                      </div>
                    </button>
                  </div>

                  {/* Back Button */}
                  {answers.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <button
                        onClick={handleBack}
                        disabled={loading}
                        className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium transition-colors disabled:opacity-50"
                      >
                        <FaArrowLeft />
                        Kembali ke pertanyaan sebelumnya
                      </button>
                    </div>
                  )}

                  {loading && (
                    <div className="mt-6 text-center">
                      <LoadingSpinner size="medium" />
                      <p className="text-gray-500 text-sm mt-2">Memproses jawaban...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ExpertSystemPage
