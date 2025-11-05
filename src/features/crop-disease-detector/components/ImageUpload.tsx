import { useRef } from 'react'

interface Props {
  image: string | null
  analyzing: boolean
  t: { upload: string; camera: string; analyzing: string }
  onImageSelected: (dataUrl: string) => void
  onReset: () => void
}

export default function ImageUpload({ image, analyzing, t, onImageSelected, onReset }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const cameraInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        onImageSelected(result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-300 mb-6 flex items-center">
        <i className="bi bi-camera mr-3 text-3xl"></i>
        Image Upload
      </h2>

      {!image ? (
        <div className="space-y-4">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-green-500/30 rounded-xl p-12 text-center cursor-pointer hover:border-green-500 hover:bg-white/5 transition-all"
          >
            <i className="bi bi-upload text-6xl text-green-500 mb-4 block"></i>
            <p className="text-white font-medium mb-2 text-lg">{t.upload}</p>
            <p className="text-sm text-white/70">Click to browse or drag & drop</p>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[rgba(18,18,18,0.9)] text-white/70">or</span>
            </div>
          </div>

          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 font-medium hover:shadow-[0_0_20px_rgba(67,160,71,0.5)]"
          >
            <i className="bi bi-camera-fill text-xl"></i>
            <span>{t.camera}</span>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-green-500/30">
            <img src={image} alt="Uploaded" className="w-full h-auto" />
            <button
              onClick={onReset}
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {analyzing && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
              <p className="mt-4 text-white font-medium">{t.analyzing}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}


