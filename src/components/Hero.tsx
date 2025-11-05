import { useEffect, useRef } from 'react'

interface HeroProps {
  title: string
  subtitle: string
  description?: string
}

export default function Hero({ title, subtitle, description }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Ensure video plays
    const video = videoRef.current
    if (video) {
      video.play().catch((err) => {
        console.warn('Video autoplay failed:', err)
      })
    }
  }, [])

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a1a] via-[#2d7a2d] to-[#1a4a1a] animate-gradient-shift"></div>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ minWidth: '100%', minHeight: '100%' }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full">
        <div className="container mx-auto px-4">
          <div className="flex justify-center text-center">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg animate-fade-in">
                <i className="bi bi-flower1 inline-block mr-3"></i>
                {title}
              </h1>
              <p className="text-2xl md:text-3xl mb-4 text-green-300 drop-shadow-md animate-fade-in-delay">
                {subtitle}
              </p>
              {description && (
                <p className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in-delay-2">
                  {description}
                </p>
              )}
              <a
                href="#upload"
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full hover:bg-green-500/30 hover:border-green-400 transition-all hover:shadow-[0_0_25px_rgba(67,160,71,0.5)] hover:-translate-y-1 animate-fade-in-delay-3"
              >
                <span>Get Started</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white text-3xl animate-bounce">
        <i className="bi bi-chevron-down"></i>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 15s ease infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in 0.3s both;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 1s ease-in 0.6s both;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 1s ease-in 0.9s both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

