import { useEffect, useState } from 'react'
import { fetchWeatherByCoords, estimateDiseaseRisk } from '@/services/weather'
import { getConfig } from '@/config/runtimeConfig'
import type { PredictionResult, TranslationStrings } from '../types'

interface Props {
  prediction: PredictionResult | null
  analyzing: boolean
  t: TranslationStrings
  onNewScan: () => void
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'High':
      return 'text-red-400 bg-red-500/20 border-red-500/50'
    case 'Medium':
      return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
    case 'None':
      return 'text-green-400 bg-green-500/20 border-green-500/50'
    default:
      return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
  }
}

export default function Results({ prediction, analyzing, t, onNewScan }: Props) {
  const [weather, setWeather] = useState<{ tempC: number; humidity: number; description: string } | null>(null)
  const [risk, setRisk] = useState<'Low' | 'Medium' | 'High' | null>(null)

  useEffect(() => {
    const apiKey = getConfig('VITE_OPENWEATHER_API_KEY')
    if (!apiKey || !prediction) return
    navigator.geolocation?.getCurrentPosition(
      async (pos) => {
        const w = await fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude, apiKey)
        if (w) {
          setWeather(w)
          setRisk(estimateDiseaseRisk(w.humidity, w.tempC))
        }
      },
      () => {}
    )
  }, [prediction])
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-300 mb-6 flex items-center">
        <i className="bi bi-clipboard-check mr-3 text-3xl"></i>
        Diagnosis Results
      </h2>

      {!prediction && !analyzing ? (
        <div className="flex flex-col items-center justify-center h-64 text-white/50">
          <i className="bi bi-flower1 text-6xl mb-4 text-green-500/50"></i>
          <p className="text-center text-lg">Upload an image to begin analysis</p>
        </div>
      ) : prediction ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{prediction.disease}</h3>
                <p className="text-green-300">{t.crop}: {prediction.data.crop}</p>
              </div>
              <div className={`px-4 py-2 rounded-full font-semibold border ${getSeverityColor(prediction.data.severity)}`}>
                {prediction.data.severity}
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
              <i className="bi bi-check-circle text-green-500 text-xl"></i>
              <span className="text-white">{t.confidence}: </span>
              <span className="font-bold text-green-400">{prediction.data.confidence}%</span>
            </div>
          </div>

          <div className="border border-green-500/30 rounded-xl p-6 bg-white/5">
            <h4 className="font-semibold text-green-300 mb-3 flex items-center text-lg">
              <i className="bi bi-bug mr-2 text-orange-400"></i>
              {t.symptoms}
            </h4>
            <p className="text-white/90">{prediction.data.symptoms}</p>
          </div>

          <div className="border border-green-500/30 rounded-xl p-6 bg-white/5">
            <h4 className="font-semibold text-green-300 mb-4 flex items-center text-lg">
              <i className="bi bi-droplet mr-2 text-blue-400"></i>
              {t.treatment}
            </h4>

            <div className="space-y-4">
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                <p className="font-medium text-blue-300 mb-2">{t.chemical}:</p>
                <p className="text-white/90 text-sm">{prediction.data.treatment.chemical}</p>
              </div>

              <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                <p className="font-medium text-green-300 mb-2">{t.organic}:</p>
                <p className="text-white/90 text-sm">{prediction.data.treatment.organic}</p>
              </div>

              <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
                <p className="font-medium text-purple-300 mb-2">{t.prevention}:</p>
                <p className="text-white/90 text-sm">{prediction.data.treatment.prevention}</p>
              </div>
            </div>
          </div>

          {weather && (
            <div className="border border-green-500/30 rounded-xl p-6 bg-green-500/10">
              <h4 className="font-semibold text-green-300 mb-2">Local Conditions</h4>
              <p className="text-white/90 text-sm">Temp: {weather.tempC}°C • Humidity: {weather.humidity}% • {weather.description}</p>
              {risk && <p className="mt-2 text-sm font-medium text-green-300">Estimated disease spread risk: {risk}</p>}
            </div>
          )}

          <button
            onClick={onNewScan}
            className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-medium hover:shadow-[0_0_20px_rgba(67,160,71,0.5)]"
          >
            <i className="bi bi-arrow-repeat mr-2"></i>
            {t.newScan}
          </button>
        </div>
      ) : null}
    </div>
  )
}


