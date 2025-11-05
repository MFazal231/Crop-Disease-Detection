import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageUpload from '../features/crop-disease-detector/components/ImageUpload'
import Results from '../features/crop-disease-detector/components/Results'
import InfoBanner from '../features/crop-disease-detector/components/InfoBanner'
import HistoryPanel from '../features/crop-disease-detector/components/HistoryPanel'
import SettingsPanel from '../features/crop-disease-detector/components/SettingsPanel'
import { diseaseDatabase, translations } from '../features/crop-disease-detector/constants'
import { initModel, predictFromImage } from '@/lib/model'
import { addHistory } from '../features/crop-disease-detector/history'
import { getConfig } from '@/config/runtimeConfig'
import type { PredictionResult } from '../features/crop-disease-detector/types'

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [labels, setLabels] = useState<string[] | null>(null)

  const t = translations['en']

  const diseases = useMemo(() => Object.keys(diseaseDatabase), [])

  // Try to load labels.json from same directory as modelUrl
  useEffect(() => {
    const modelUrl = getConfig('VITE_TFJS_MODEL_URL')
    if (!modelUrl) {
      setLabels(null)
      return
    }
    try {
      const base = modelUrl.replace(/\/[^/]*$/, '')
      const labelsUrl = base ? `${base}/labels.json` : 'labels.json'
      fetch(labelsUrl)
        .then((r) => (r.ok ? r.json() : null))
        .then((j) => {
          if (Array.isArray(j) && j.every((x) => typeof x === 'string')) {
            setLabels(j)
          } else {
            setLabels(null)
          }
        })
        .catch(() => setLabels(null))
    } catch {
      setLabels(null)
    }
  }, [])

  function analyzeDiseaseDemo(): PredictionResult {
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]
    return { disease: randomDisease, data: diseaseDatabase[randomDisease] }
  }

  function analyzeImage() {
    setAnalyzing(true)
    setPrediction(null)
    setTimeout(() => {
      const result = analyzeDiseaseDemo()
      setPrediction(result)
      setAnalyzing(false)
      if (image) {
        addHistory({ imageDataUrl: image, prediction: result })
      }
    }, 2000)
  }

  function handleSelected(dataUrl: string) {
    setImage(dataUrl)
    // Try TFJS inference if model configured, else demo
    const modelUrl = getConfig('VITE_TFJS_MODEL_URL')
    const backendApiUrl = getConfig('VITE_BACKEND_INFER_URL')
    if (modelUrl || backendApiUrl) {
      ;(async () => {
        setAnalyzing(true)
        setPrediction(null)
        await initModel({ modelUrl, backendApiUrl })
        const img = new Image()
        img.onload = async () => {
          const labelList = labels ?? Object.keys(diseaseDatabase)
          const res = await predictFromImage(img, labelList, { modelUrl, backendApiUrl })
          if (res) {
            const data = diseaseDatabase[res.label] ?? {
              crop: 'Unknown',
              severity: 'Medium',
              symptoms: 'Model prediction with no mapped metadata',
              treatment: { chemical: '-', organic: '-', prevention: '-' },
              confidence: res.confidence,
            }
            const final = { disease: res.label, data }
            setPrediction(final)
            addHistory({ imageDataUrl: dataUrl, prediction: final })
          } else {
            analyzeImage()
          }
          setAnalyzing(false)
        }
        img.src = dataUrl
      })()
    } else {
      analyzeImage()
    }
  }

  function resetScan() {
    setImage(null)
    setPrediction(null)
    setAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">AI Crop Disease Detection</h1>
            <p className="text-xl text-white/90">Upload or capture leaf images for instant AI-powered disease diagnosis</p>
          </div>
          
          <div id="settings" className="scroll-mt-16 mb-8"></div>
          <SettingsPanel />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-8">
              <ImageUpload
                image={image}
                analyzing={analyzing}
                t={t}
                onImageSelected={handleSelected}
                onReset={resetScan}
              />
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl p-8">
              <Results
                prediction={prediction}
                analyzing={analyzing}
                t={t}
                onNewScan={resetScan}
              />
            </div>
          </div>

          <InfoBanner />
          <HistoryPanel />
        </div>
      </div>
      <Footer />
    </div>
  )
}

