import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import AnimatedLogo from './AnimatedLogo'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AnimatedLogo size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className="font-medium relative group"
            >
              {({ isActive }) => (
                <motion.span
                  style={{ 
                    color: '#43a047', 
                    display: 'inline-block' 
                  }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: '0 0 12px rgba(67, 160, 71, 0.9), 0 0 24px rgba(67, 160, 71, 0.7)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative text-agri-green-light"
                >
                  Home
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-0.5 bg-agri-green-light"
                    style={{ backgroundColor: '#43a047', transformOrigin: 'center' }}
                    initial={false}
                    animate={{ 
                      width: isActive ? '100%' : '0%',
                      x: '-50%',
                      opacity: isActive ? 1 : 0
                    }}
                    whileHover={{ 
                      width: '120%',
                      x: '-50%',
                      opacity: 1
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </motion.span>
              )}
            </NavLink>
            <NavLink
              to="/disease-detection"
              className="font-medium relative group"
            >
              {({ isActive }) => (
                <motion.span
                  style={{ 
                    color: '#43a047', 
                    display: 'inline-block' 
                  }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: '0 0 12px rgba(67, 160, 71, 0.9), 0 0 24px rgba(67, 160, 71, 0.7)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative text-agri-green-light"
                >
                  Disease Detection
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-0.5 bg-agri-green-light"
                    style={{ backgroundColor: '#43a047', transformOrigin: 'center' }}
                    initial={false}
                    animate={{ 
                      width: isActive ? '100%' : '0%',
                      x: '-50%',
                      opacity: isActive ? 1 : 0
                    }}
                    whileHover={{ 
                      width: '120%',
                      x: '-50%',
                      opacity: 1
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </motion.span>
              )}
            </NavLink>
            <NavLink
              to="/about"
              className="font-medium relative group"
            >
              {({ isActive }) => (
                <motion.span
                  style={{ 
                    color: '#43a047', 
                    display: 'inline-block' 
                  }}
                  whileHover={{
                    scale: 1.1,
                    textShadow: '0 0 12px rgba(67, 160, 71, 0.9), 0 0 24px rgba(67, 160, 71, 0.7)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="relative text-agri-green-light"
                >
                  About
                  <motion.span
                    className="absolute bottom-0 left-1/2 h-0.5 bg-agri-green-light"
                    style={{ backgroundColor: '#43a047', transformOrigin: 'center' }}
                    initial={false}
                    animate={{ 
                      width: isActive ? '100%' : '0%',
                      x: '-50%',
                      opacity: isActive ? 1 : 0
                    }}
                    whileHover={{ 
                      width: '120%',
                      x: '-50%',
                      opacity: 1
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </motion.span>
              )}
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-agri-green transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors text-white ${
                    isActive ? 'text-agri-green-light' : 'text-white hover:text-agri-green-light'
                  }`
                }
                style={{ color: '#ffffff' }}
              >
                Home
              </NavLink>
              <NavLink
                to="/disease-detection"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors text-white ${
                    isActive ? 'text-agri-green-light' : 'text-white hover:text-agri-green-light'
                  }`
                }
                style={{ color: '#ffffff' }}
              >
                Disease Detection
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors text-white ${
                    isActive ? 'text-agri-green-light' : 'text-white hover:text-agri-green-light'
                  }`
                }
                style={{ color: '#ffffff' }}
              >
                About
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar

