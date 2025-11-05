export interface WeatherNow {
  tempC: number
  humidity: number
  description: string
}

export async function fetchWeatherByCoords(lat: number, lon: number, apiKey: string): Promise<WeatherNow | null> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json()
    return {
      tempC: json.main?.temp ?? 0,
      humidity: json.main?.humidity ?? 0,
      description: json.weather?.[0]?.description ?? 'n/a',
    }
  } catch {
    return null
  }
}

export function estimateDiseaseRisk(humidity: number, tempC: number): 'Low' | 'Medium' | 'High' {
  if (humidity > 80 && tempC >= 20 && tempC <= 30) return 'High'
  if (humidity > 60 && tempC >= 18 && tempC <= 32) return 'Medium'
  return 'Low'
}


