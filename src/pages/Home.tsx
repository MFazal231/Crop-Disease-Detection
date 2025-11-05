import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import StatsSection from '../components/StatsSection'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  )
}

export default Home

