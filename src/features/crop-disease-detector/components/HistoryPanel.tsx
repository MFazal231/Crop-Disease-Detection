import { useEffect, useState } from 'react'
import { getHistory, clearHistory, type HistoryItem } from '../history'

export default function HistoryPanel() {
  const [items, setItems] = useState<HistoryItem[]>([])
  useEffect(() => {
    setItems(getHistory())
  }, [])

  return (
    <div className="mt-8 bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Scan History</h3>
        <button className="text-sm text-red-600" onClick={() => { clearHistory(); setItems([]) }}>Clear</button>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">No scans yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((h) => (
            <div key={h.id} className="border rounded-lg overflow-hidden">
              <img src={h.imageDataUrl} alt="history" className="w-full h-28 object-cover" />
              <div className="p-2">
                <p className="text-sm font-medium truncate">{h.prediction?.disease ?? 'Unknown'}</p>
                <p className="text-xs text-gray-500">{new Date(h.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


