import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">About AgriFarm</h1>
          
          <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-green-300 flex items-center gap-2">
              <i className="bi bi-bullseye text-xl"></i>
              Our Mission
            </h2>
            <p className="text-white/90 leading-relaxed">
              AgriFarm is dedicated to revolutionizing agriculture through AI-powered crop disease detection. 
              Our platform helps farmers identify diseases early, get treatment recommendations, and protect 
              their crops for better yields.
            </p>

            <h2 className="text-2xl font-semibold text-green-300 mt-8 flex items-center gap-2">
              <i className="bi bi-cpu text-xl"></i>
              Technology
            </h2>
            <p className="text-white/90 leading-relaxed">
              We use advanced machine learning models trained on the PlantVillage dataset, achieving 
              95%+ accuracy in detecting 16 different disease classes across multiple crop types including 
              tomatoes, potatoes, and peppers.
            </p>

            <h2 className="text-2xl font-semibold text-green-300 mt-8 flex items-center gap-2">
              <i className="bi bi-star text-xl"></i>
              Features
            </h2>
            <ul className="list-none space-y-3 text-white/90">
              <li className="flex items-start gap-3">
                <i className="bi bi-check-circle text-green-400 text-xl mt-0.5"></i>
                <span>Instant AI-powered disease detection from leaf images</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-check-circle text-green-400 text-xl mt-0.5"></i>
                <span>Comprehensive treatment recommendations (chemical and organic)</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-check-circle text-green-400 text-xl mt-0.5"></i>
                <span>Support for multiple languages (English, Hindi, Tamil)</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-check-circle text-green-400 text-xl mt-0.5"></i>
                <span>Offline-capable with TensorFlow.js</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="bi bi-check-circle text-green-400 text-xl mt-0.5"></i>
                <span>Backend API integration for server-side inference</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About

