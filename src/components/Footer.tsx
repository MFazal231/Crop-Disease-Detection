import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="font-bold text-2xl text-agri-green-light">AgriFarm</span>
            </div>
            <p className="text-gray-400">
              AI-powered crop disease detection for healthier farms and better yields.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-agri-green-light transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/disease-detection"
                  className="text-gray-400 hover:text-agri-green-light transition-colors"
                >
                  Disease Detection
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-agri-green-light transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-agri-green mt-0.5 flex-shrink-0" />
                <span>Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-agri-green flex-shrink-0" />
                <span>+91 9823000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-agri-green flex-shrink-0" />
                <span>info@agrifarm.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 AgriFarm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

