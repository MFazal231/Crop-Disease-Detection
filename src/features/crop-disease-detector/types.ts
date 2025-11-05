export type LanguageCode = 'en' | 'hi' | 'ta'

export interface TreatmentInfo {
  chemical: string
  organic: string
  prevention: string
}

export interface DiseaseData {
  crop: string
  severity: 'High' | 'Medium' | 'None' | string
  symptoms: string
  treatment: TreatmentInfo
  confidence: number
}

export type DiseaseDatabase = Record<string, DiseaseData>

export interface TranslationStrings {
  title: string
  subtitle: string
  upload: string
  camera: string
  analyzing: string
  disease: string
  crop: string
  severity: string
  confidence: string
  symptoms: string
  treatment: string
  chemical: string
  organic: string
  prevention: string
  newScan: string
  selectLanguage: string
}

export type Translations = Record<LanguageCode, TranslationStrings>

export interface PredictionResult {
  disease: string
  data: DiseaseData
}


