"""
Flask backend for Crop Disease Detector
Handles image predictions using TensorFlow/Keras model
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow import keras
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Global variable to store loaded model
model = None
labels = None

def load_model():
    """Load the Keras model and labels"""
    global model, labels
    
    # Load model - adjust path as needed
    model_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'export_tfjs', 'model.keras')
    if not os.path.exists(model_path):
        model_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'export_tfjs', 'model.h5')
    
    if os.path.exists(model_path):
        # Load model without optimizer weights to avoid warnings
        try:
            model = keras.models.load_model(model_path, compile=False)
            print(f"✓ Model loaded from {model_path}")
        except Exception as e:
            print(f"⚠ Error loading model: {e}")
            print("Trying to load with compile=True...")
            model = keras.models.load_model(model_path)
            print(f"✓ Model loaded from {model_path}")
    else:
        print(f"⚠ Model not found at {model_path}")
        return False
    
    # Load labels
    labels_path = os.path.join(os.path.dirname(__file__), '..', 'ml', 'export_tfjs', 'labels.json')
    if os.path.exists(labels_path):
        import json
        with open(labels_path, 'r') as f:
            labels = json.load(f)
        print(f"✓ Labels loaded: {len(labels)} classes")
    else:
        print(f"⚠ Labels not found at {labels_path}")
        # Default labels from PlantVillage dataset
        labels = [
            "Pepper__bell___Bacterial_spot", "Pepper__bell___healthy", "PlantVillage",
            "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
            "Tomato_Bacterial_spot", "Tomato_Early_blight", "Tomato_Late_blight",
            "Tomato_Leaf_Mold", "Tomato_Septoria_leaf_spot", "Tomato_Spider_mites_Two_spotted_spider_mite",
            "Tomato__Target_Spot", "Tomato__Tomato_YellowLeaf__Curl_Virus",
            "Tomato__Tomato_mosaic_virus", "Tomato_healthy"
        ]
    
    return True

def preprocess_image(image_data):
    """
    Preprocess image for model input
    Args:
        image_data: PIL Image or numpy array
    Returns:
        Preprocessed image array (224, 224, 3) normalized to [0, 1]
    """
    if isinstance(image_data, Image.Image):
        img = image_data
    else:
        img = Image.fromarray(image_data)
    
    # Resize to 224x224 (model input size)
    img = img.resize((224, 224))
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to numpy array and normalize
    img_array = np.array(img, dtype=np.float32) / 255.0
    
    # Add batch dimension: (1, 224, 224, 3)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

@app.route('/', methods=['GET'])
def index():
    """API information endpoint"""
    return jsonify({
        'service': 'Crop Disease Detector API',
        'version': '1.0.0',
        'endpoints': {
            'GET /': 'API information (this page)',
            'GET /health': 'Health check',
            'POST /predict': 'Predict crop disease from image'
        },
        'status': 'running',
        'model_loaded': model is not None,
        'labels_count': len(labels) if labels else 0
    })

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'labels_count': len(labels) if labels else 0
    })

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict crop disease from image
    Expected JSON body: { "image": "data:image/jpeg;base64,..." }
    Returns: { "prediction": { "label": "...", "confidence": 95 } }
    """
    global model, labels
    
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400
        
        # Extract base64 image data
        image_data_url = data['image']
        
        # Handle data URL format: "data:image/jpeg;base64,/9j/4AAQ..."
        if ',' in image_data_url:
            header, encoded = image_data_url.split(',', 1)
        else:
            encoded = image_data_url
        
        # Decode base64 image
        image_bytes = base64.b64decode(encoded)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Preprocess image
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image, verbose=0)
        
        # Get top prediction
        predicted_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_idx])
        confidence_percent = int(confidence * 100)
        
        # Get label
        label = labels[predicted_idx] if labels and predicted_idx < len(labels) else f"class_{predicted_idx}"
        
        return jsonify({
            'prediction': {
                'label': label,
                'confidence': confidence_percent
            }
        })
        
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Loading model...")
    if load_model():
        print("✓ Backend ready!")
        print("Starting Flask server on http://localhost:5000")
        print("API endpoint: POST http://localhost:5000/predict")
        app.run(host='0.0.0.0', port=5000, debug=True)
    else:
        print("❌ Failed to load model. Please check model path.")
        print("Make sure you've trained the model and it exists in ml/export_tfjs/")

