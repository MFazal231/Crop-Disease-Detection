import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'

interface AnimatedLogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const AnimatedLogo = ({ className = '', size = 'md' }: AnimatedLogoProps) => {
  const letters = 'AgriFarm'.split('')

  const getLetterVariants = (index: number) => ({
    initial: {
      scale: 1,
      textShadow: '0 0 0px rgba(67, 160, 71, 0)',
    },
    hover: {
      scale: 1.2,
      textShadow: '0 0 12px rgba(67, 160, 71, 0.9), 0 0 24px rgba(67, 160, 71, 0.7), 0 0 36px rgba(67, 160, 71, 0.5)',
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  })

  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl'

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
        whileHover={{ 
          rotate: 360, 
          scale: 1.2,
          transition: { duration: 0.6 }
        }}
      >
        <Sprout className={`${iconSize} text-agri-green-light`} style={{ color: '#43a047' }} />
      </motion.div>
      <motion.div
        className="flex items-center"
        style={{ gap: '2px' }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={getLetterVariants(index)}
            initial="initial"
            whileHover="hover"
            className={`font-bold ${textSize} ${
              index < 4 ? 'text-agri-green' : 'text-agri-green-light'
            }`}
            style={{
              display: 'inline-block',
              color: index < 4 ? '#2e7d32' : '#43a047',
              transformOrigin: 'center',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    </Link>
  )
}

export default AnimatedLogo

