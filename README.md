# Crop Disease Detector

AI-powered crop disease detection web application with offline support and Flask backend option.

## Features

- 🧠 **TensorFlow.js** - Run ML model directly in browser (offline capable)
- 🔄 **Flask Backend** - Optional server-side inference for better performance
- 🌍 **Multi-language** - English, Hindi, Tamil support
- 📱 **PWA** - Progressive Web App with offline support
- 🌤️ **Weather Integration** - Disease risk estimation based on local weather

## Quick Start

### Frontend Setup

```bash
npm install
npm run dev
```

### Flask Backend (Optional)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Then in the app Settings, enter: `http://localhost:5000/predict`

## Runtime Settings (no rebuild)

Open the app and click Settings to paste:
- **TFJS Model URL** (e.g., `/model/model.json`) - For browser-based inference
- **Backend Inference URL** (e.g., `http://localhost:5000/predict`) - For Flask backend
- **OpenWeather API Key** (optional) - For weather-based risk estimation

These values override `.env` on this device.

## Environment Variables

Create `.env` (optional):

```env
VITE_TFJS_MODEL_URL=/model/model.json
VITE_BACKEND_INFER_URL=http://localhost:5000/predict
VITE_OPENWEATHER_API_KEY=your_openweather_key
```

## Model Training

See `ml/train_plantvillage.ipynb` for training instructions.

## Project Structure

```
crop-disease-detector/
├── src/                    # React frontend
├── backend/                # Flask backend (optional)
├── ml/                     # Model training notebook
└── public/model/           # TensorFlow.js model files
```

## Backend Options

1. **Browser-only (TFJS)** - No backend needed, works offline
2. **Flask Backend** - Server-side inference (see `backend/README.md`)
3. **Custom Backend** - Any API that accepts `{ image: "data:image/jpeg;base64,..." }` and returns `{ prediction: { label, confidence } }`
