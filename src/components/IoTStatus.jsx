import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

export default function IoTStatus() {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    timestamp: null,
    deviceId: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSensorData = async () => {
    try {
      const response = await axiosInstance.get('/payments/sensor-data/latest')
      if (response.success) {
        setSensorData(response.data)
        setError(null)
      }
    } catch (err) {
      console.error('Error fetching sensor data:', err)
      setError('Failed to fetch IoT data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Fetch initial data
    fetchSensorData()

    // Refresh every 10 seconds
    const interval = setInterval(fetchSensorData, 10000)

    return () => clearInterval(interval)
  }, [])

  const getTemperatureColor = (temp) => {
    if (temp < 20) return 'text-blue-600'
    if (temp < 30) return 'text-green-600'
    if (temp < 35) return 'text-orange-600'
    return 'text-red-600'
  }

  const getHumidityColor = (humidity) => {
    if (humidity < 30) return 'text-orange-600'
    if (humidity < 70) return 'text-green-600'
    return 'text-blue-600'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          IoT Device Status
        </h3>
        {sensorData.timestamp && (
          <span className="text-xs text-gray-500">
            {new Date(sensorData.timestamp).toLocaleTimeString('id-ID')}
          </span>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {/* Temperature */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Temperature</span>
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${getTemperatureColor(sensorData.temperature)}`}>
              {sensorData.temperature.toFixed(1)}°C
            </div>
          </div>

          {/* Humidity */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Humidity</span>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div className={`text-3xl font-bold ${getHumidityColor(sensorData.humidity)}`}>
              {sensorData.humidity.toFixed(1)}%
            </div>
          </div>
        </div>
      )}

      {sensorData.deviceId && (
        <div className="mt-4 text-xs text-gray-500 text-center">
          Device: {sensorData.deviceId}
        </div>
      )}
    </div>
  )
}
