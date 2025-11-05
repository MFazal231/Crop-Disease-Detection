type Keys = 'VITE_TFJS_MODEL_URL' | 'VITE_BACKEND_INFER_URL' | 'VITE_OPENWEATHER_API_KEY'

const LS_PREFIX = 'cropdetect.config.'

export function getConfig(key: Keys): string | undefined {
  const override = localStorage.getItem(LS_PREFIX + key) || undefined
  if (override) return override
  return (import.meta as any).env?.[key] as string | undefined
}

export function setConfig(key: Keys, value: string) {
  localStorage.setItem(LS_PREFIX + key, value)
}

export function clearConfig(key: Keys) {
  localStorage.removeItem(LS_PREFIX + key)
}

export function listConfig(): Record<Keys, string | undefined> {
  return {
    VITE_TFJS_MODEL_URL: getConfig('VITE_TFJS_MODEL_URL'),
    VITE_BACKEND_INFER_URL: getConfig('VITE_BACKEND_INFER_URL'),
    VITE_OPENWEATHER_API_KEY: getConfig('VITE_OPENWEATHER_API_KEY'),
  }
}


