import type { PredictionResult } from './types'

export interface HistoryItem {
  id: string
  timestamp: number
  imageDataUrl: string
  prediction: PredictionResult | null
}

const KEY = 'crop-disease-history'

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as HistoryItem[]) : []
  } catch {
    return []
  }
}

export function addHistory(item: Omit<HistoryItem, 'id' | 'timestamp'>) {
  const current = getHistory()
  const entry: HistoryItem = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    ...item,
  }
  localStorage.setItem(KEY, JSON.stringify([entry, ...current].slice(0, 50)))
  return entry
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}


