import { useState } from 'react'

interface NavbarProps {
  language: string
  setLanguage: (lang: string) => void
  t: any
}

export default function AgriFarmNavbar({ language, setLanguage, t }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50)
    })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(26,26,26,0.98)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-[rgba(26,26,26,0.95)] shadow-[0_2px_10px_rgba(0,0,0,0.3)]'
      } backdrop-blur-md`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <a href="#" className="flex items-center gap-3 text-xl font-bold text-green-500 no-underline">
            <img src="/images/logo.png" alt="Logo" className="h-[75px] w-auto" />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="#settings"
              className="px-4 py-2 text-sm border border-white/20 rounded-lg text-white hover:bg-green-600 transition-all"
            >
              Settings
            </a>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

