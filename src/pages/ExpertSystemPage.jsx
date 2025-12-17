import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaLightbulb, FaCheckCircle, FaArrowLeft, FaCheck, FaTimes, FaMars, FaVenus } from 'react-icons/fa'
import { expertSystemService } from '../api/services'
import LoadingSpinner from '../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

function ExpertSystemPage() {
  const [sessionId, setSessionId] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [currentQuestionId, setCurrentQuestionId] = useState(null)
  const [currentOptions, setCurrentOptions] = useState([])
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
      setCurrentOptions(startData.nextQuestion?.options || [])
      setQuestionHistory([{
        questionId: startData.nextQuestion?.id,
        question: startData.nextQuestion?.text || startData.question,
        options: startData.nextQuestion?.options || []
      }])
    } catch (error) {
      toast.error('Gagal memulai konsultasi')
      console.error('Error initializing expert system:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = async (option) => {
    try {
      setLoading(true)
      const newAnswers = [...answers, { question: currentQuestion, answer: option.text }]
      setAnswers(newAnswers)

      const response = await expertSystemService.diagnose({
        sessionId,
        questionId: currentQuestionId,
        selectedOptionId: option.id,
      })

      if (response.isComplete && response.recommendation) {
        setRecommendation(response.recommendation)
        setCurrentQuestion(null)
        setCurrentQuestionId(null)
        setCurrentOptions([])
      } else if (response.nextQuestion) {
        setCurrentQuestion(response.nextQuestion.text)
        setCurrentQuestionId(response.nextQuestion.id)
        setCurrentOptions(response.nextQuestion.options || [])
        setQuestionHistory([...questionHistory, {
          questionId: response.nextQuestion.id,
          question: response.nextQuestion.text,
          options: response.nextQuestion.options || []
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
      setCurrentOptions(previousQuestion.options || [])
    }
  }

  // Hitung total pertanyaan berdasarkan gender yang dipilih
  const getTotalQuestions = () => {

    const genderAnswer = answers.find(a => a.question?.includes('jenis kelamin'))
    if (genderAnswer) {
      return genderAnswer.answer === 'Wanita' ? 9 : 8
    }
    return 9 // Default max
  }

  const totalQuestions = getTotalQuestions()
  const currentProgress = Math.min(answers.length + 1, totalQuestions)

  const resetConsultation = () => {
    setSessionId(null)
    setCurrentQuestion(null)
    setCurrentQuestionId(null)
    setCurrentOptions([])
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
                    {answers.map((item, index) => {
                      const isYes = item.answer === 'Ya'
                      const isNo = item.answer === 'Tidak'
                      const isMale = item.answer === 'Pria'
                      const isFemale = item.answer === 'Wanita'
                      
                      let iconColor = 'text-primary-600'
                      let textColor = 'text-primary-700'
                      let Icon = null
                      
                      if (isYes) {
                        Icon = FaCheck
                        iconColor = 'text-green-600'
                        textColor = 'text-green-700'
                      } else if (isNo) {
                        Icon = FaTimes
                        iconColor = 'text-red-600'
                        textColor = 'text-red-700'
                      } else if (isMale) {
                        Icon = FaMars
                        iconColor = 'text-blue-600'
                        textColor = 'text-blue-700'
                      } else if (isFemale) {
                        Icon = FaVenus
                        iconColor = 'text-pink-600'
                        textColor = 'text-pink-700'
                      }
                      
                      return (
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
                            {Icon && <Icon className={`${iconColor} text-sm`} />}
                            <span className={`font-semibold text-sm ${textColor}`}>
                              {item.answer}
                            </span>
                          </div>
                        </div>
                      )
                    })}
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
                      Pertanyaan {currentProgress} dari {totalQuestions}
                    </span>
                    <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                      {Math.round((currentProgress / totalQuestions) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(currentProgress / totalQuestions) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-8 text-gray-800 leading-relaxed">
                    {currentQuestion}
                  </h2>

                  {/* Answer Buttons - Dynamic from backend options */}
                  <div className="space-y-4">
                    {currentOptions.map((option, index) => {
                      const isYes = option.text === 'Ya' || option.id.includes('_yes')
                      const isNo = option.text === 'Tidak' || option.id.includes('_no')
                      const isMale = option.text === 'Pria' || option.id.includes('_male')
                      const isFemale = option.text === 'Wanita' || option.id.includes('_female')
                      
                      let colorClass = 'border-primary-200 hover:border-primary-500 hover:bg-primary-50'
                      let iconBgClass = 'bg-primary-100 group-hover:bg-primary-500'
                      let iconTextClass = 'text-primary-600 group-hover:text-white'
                      let textHoverClass = 'group-hover:text-primary-700'
                      let arrowClass = 'group-hover:text-primary-500'
                      
                      if (isYes) {
                        colorClass = 'border-green-200 hover:border-green-500 hover:bg-green-50'
                        iconBgClass = 'bg-green-100 group-hover:bg-green-500'
                        iconTextClass = 'text-green-600 group-hover:text-white'
                        textHoverClass = 'group-hover:text-green-700'
                        arrowClass = 'group-hover:text-green-500'
                      } else if (isNo) {
                        colorClass = 'border-red-200 hover:border-red-500 hover:bg-red-50'
                        iconBgClass = 'bg-red-100 group-hover:bg-red-500'
                        iconTextClass = 'text-red-600 group-hover:text-white'
                        textHoverClass = 'group-hover:text-red-700'
                        arrowClass = 'group-hover:text-red-500'
                      } else if (isMale) {
                        colorClass = 'border-blue-200 hover:border-blue-500 hover:bg-blue-50'
                        iconBgClass = 'bg-blue-100 group-hover:bg-blue-500'
                        iconTextClass = 'text-blue-600 group-hover:text-white'
                        textHoverClass = 'group-hover:text-blue-700'
                        arrowClass = 'group-hover:text-blue-500'
                      } else if (isFemale) {
                        colorClass = 'border-pink-200 hover:border-pink-500 hover:bg-pink-50'
                        iconBgClass = 'bg-pink-100 group-hover:bg-pink-500'
                        iconTextClass = 'text-pink-600 group-hover:text-white'
                        textHoverClass = 'group-hover:text-pink-700'
                        arrowClass = 'group-hover:text-pink-500'
                      }

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(option)}
                          disabled={loading}
                          className={`w-full group relative overflow-hidden p-6 border-2 ${colorClass} rounded-xl transition-all text-left font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 ${iconBgClass} rounded-full flex items-center justify-center transition-colors`}>
                                {isYes && <FaCheck className={`${iconTextClass} text-xl transition-colors`} />}
                                {isNo && <FaTimes className={`${iconTextClass} text-xl transition-colors`} />}
                                {isMale && <FaMars className={`${iconTextClass} text-2xl transition-colors`} />}
                                {isFemale && <FaVenus className={`${iconTextClass} text-2xl transition-colors`} />}
                                {!isYes && !isNo && !isMale && !isFemale && (
                                  <span className={`${iconTextClass} text-xl font-bold transition-colors`}>
                                    {index + 1}
                                  </span>
                                )}
                              </div>
                              <span className={`text-gray-700 ${textHoverClass}`}>{option.text}</span>
                            </div>
                            <span className={`text-gray-400 ${arrowClass}`}>→</span>
                          </div>
                        </button>
                      )
                    })}
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
