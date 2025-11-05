import { useEffect, useState } from 'react'
import { listConfig, setConfig, clearConfig } from '@/config/runtimeConfig'

export default function SettingsPanel() {
  const [open, setOpen] = useState(false)
  const [modelUrl, setModelUrl] = useState('')
  const [backendUrl, setBackendUrl] = useState('')
  const [weatherKey, setWeatherKey] = useState('')

  useEffect(() => {
    const cfg = listConfig()
    setModelUrl(cfg.VITE_TFJS_MODEL_URL ?? '')
    setBackendUrl(cfg.VITE_BACKEND_INFER_URL ?? '')
    setWeatherKey(cfg.VITE_OPENWEATHER_API_KEY ?? '')
  }, [open])

  function save() {
    if (modelUrl) setConfig('VITE_TFJS_MODEL_URL', modelUrl)
    else clearConfig('VITE_TFJS_MODEL_URL')
    if (backendUrl) setConfig('VITE_BACKEND_INFER_URL', backendUrl)
    else clearConfig('VITE_BACKEND_INFER_URL')
    if (weatherKey) setConfig('VITE_OPENWEATHER_API_KEY', weatherKey)
    else clearConfig('VITE_OPENWEATHER_API_KEY')
    setOpen(false)
  }

  return (
    <div className="mb-8">
      <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-green-300 flex items-center gap-2">
            <i className="bi bi-gear text-xl"></i>
            Settings
          </h3>
          <button
            className="text-sm text-green-400 hover:text-green-300 transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <i className="bi bi-chevron-up"></i> : <i className="bi bi-chevron-down"></i>}
          </button>
        </div>
        {open && (
          <div className="grid gap-3 mt-4">
            <label className="text-sm">
              <span className="block mb-1 text-green-300">TFJS Model URL (model.json)</span>
              <input
                className="w-full bg-white/10 border border-green-500/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={modelUrl}
                onChange={(e) => setModelUrl(e.target.value)}
                placeholder="/model/model.json or https://..."
              />
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-green-300">Backend Inference URL</span>
              <input
                className="w-full bg-white/10 border border-green-500/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="https://your-api/predict"
              />
            </label>
            <label className="text-sm">
              <span className="block mb-1 text-green-300">OpenWeather API Key</span>
              <input
                className="w-full bg-white/10 border border-green-500/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={weatherKey}
                onChange={(e) => setWeatherKey(e.target.value)}
                placeholder="owm_xxx"
              />
            </label>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                onClick={save}
              >
                <i className="bi bi-check-circle mr-2"></i>Save
              </button>
              <button
                className="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                onClick={() => {
                  setModelUrl('')
                  setBackendUrl('')
                  setWeatherKey('')
                }}
              >
                Reset form
              </button>
            </div>
            <p className="text-xs text-white/70">Values are saved to this device and override .env without reload.</p>
          </div>
        )}
      </div>
    </div>
  )
}


