export default function InfoBanner() {
  return (
    <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <i className="bi bi-info-circle text-2xl text-blue-400 flex-shrink-0 mt-1"></i>
        <div>
          <h3 className="font-semibold text-blue-300 mb-2">Demo Version Notice</h3>
          <p className="text-white/90 text-sm">
            This is a prototype demonstration. In production, this system would use a trained deep learning model
            (CNN/Transfer Learning) on datasets like PlantVillage with 95%+ accuracy. The current version shows
            simulated results for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  )
}


