import { motion } from 'framer-motion'

const StatsSection = () => {
  const stats = [
    { label: 'Disease Classes', value: '16+', suffix: '', icon: '🌾' },
    { label: 'Accuracy', value: '95', suffix: '%', icon: '🎯' },
    { label: 'Detection Speed', value: '<2', suffix: 's', icon: '⚡' },
    { label: 'Crops Supported', value: '10+', suffix: '', icon: '🌱' },
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-lg">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-white/90 text-sm md:text-base font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection

