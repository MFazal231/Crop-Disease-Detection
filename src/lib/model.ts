export type InferenceSource = HTMLImageElement | HTMLCanvasElement | ImageData | HTMLVideoElement

export interface ModelConfig {
  modelUrl?: string // URL to TFJS GraphModel JSON
  backendApiUrl?: string // optional REST API for inference fallback
}

let graphModel: import('@tensorflow/tfjs').GraphModel | null = null

export async function initModel(config: ModelConfig) {
  const tf = await import('@tensorflow/tfjs')
  // Optionally set WASM or WebGL backend by env in future
  if (config.modelUrl && !graphModel) {
    graphModel = await tf.loadGraphModel(config.modelUrl)
  }
}

export async function predictFromImage(
  source: InferenceSource,
  labels: string[],
  config: ModelConfig
): Promise<{ label: string; confidence: number } | null> {
  const tf = await import('@tensorflow/tfjs')

  // Backend API fallback
  if (!graphModel && config.backendApiUrl) {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const width = 224
      const height = 224
      canvas.width = width
      canvas.height = height
      ctx.drawImage(source as any, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
      const res = await fetch(config.backendApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      })
      if (!res.ok) return null
      const json = await res.json()
      return json?.prediction ?? null
    } catch {
      return null
    }
  }

  if (!graphModel) return null

  const input = tf.tidy(() => {
    const tensor = tf.browser.fromPixels(source as any)
    const resized = tf.image.resizeBilinear(tensor, [224, 224])
    const normalized = resized.toFloat().div(255)
    return normalized.expandDims(0)
  })

  const logits = graphModel.execute(input) as import('@tensorflow/tfjs').Tensor
  const probs = (await (await logits.softmax()).array()) as number[][]
  input.dispose()
  logits.dispose()

  const p = probs[0]
  if (!p) return null
  let bestIdx = 0
  for (let i = 1; i < p.length; i++) if (p[i] > p[bestIdx]) bestIdx = i
  return { label: labels[bestIdx] ?? `class_${bestIdx}`, confidence: Math.round(p[bestIdx] * 100) }
}
