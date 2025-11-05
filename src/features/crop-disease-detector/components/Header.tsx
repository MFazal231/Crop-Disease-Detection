import { Leaf } from 'lucide-react'
import type { LanguageCode, Translations } from '../types'

interface Props {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: Translations[LanguageCode]
}

export default function Header({ language, setLanguage, t }: Props) {
  return (
    <div className="bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
              <p className="text-sm text-gray-600">{t.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="#settings" className="px-3 py-2 text-sm border rounded-lg">Settings</a>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}


