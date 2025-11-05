# Flask Backend for Crop Disease Detector

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Ensure model is trained:**
   - Train the model using the Jupyter notebook: `ml/train_plantvillage.ipynb`
   - The model should be saved in `ml/export_tfjs/model.keras` or `model.h5`
   - Labels should be in `ml/export_tfjs/labels.json`

3. **Run the server:**
   ```bash
   python app.py
   ```

   The server will start on `http://localhost:5000`

## API Endpoints

### `POST /predict`
Predict crop disease from an image.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

**Response:**
```json
{
  "prediction": {
    "label": "Tomato_Late_blight",
    "confidence": 94
  }
}
```

### `GET /health`
Check server and model status.

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "labels_count": 16
}
```

## Frontend Integration

1. **Start the Flask backend:**
   ```bash
   cd backend
   python app.py
   ```

2. **Configure frontend:**
   - Open the app in browser
   - Click "Settings"
   - Enter Backend Inference URL: `http://localhost:5000/predict`
   - Save

3. **Test:**
   - Upload an image
   - The frontend will automatically use the Flask backend for inference

## CORS

The backend has CORS enabled for development. For production:

- Update `CORS(app)` in `app.py` to restrict origins
- Or use environment variables for allowed origins

## Production Deployment

For production, use a production WSGI server:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

Or use Docker, cloud platforms (Heroku, AWS, etc.), or reverse proxy (nginx).

