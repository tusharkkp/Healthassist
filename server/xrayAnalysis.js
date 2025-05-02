const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tf = require('@tensorflow/tfjs-node');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Configure storage for uploaded X-ray images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/temp');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// Configure file upload middleware with restrictions
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
    }
  }
});

// Load and prepare the TensorFlow model
let model;
async function loadModel() {
  try {
    // Load the model
    model = await tf.loadLayersModel(
      `file://${path.join(__dirname, '../models/xray_model/model.json')}`
    );
    console.log('X-ray analysis model loaded successfully');
  } catch (error) {
    console.error('Error loading X-ray analysis model:', error);
  }
}

// Call loadModel on startup
loadModel();

/**
 * Preprocess the X-ray image for the model
 * @param {string} imagePath Path to the image file
 * @returns {tf.Tensor} Processed tensor ready for prediction
 */
async function preprocessImage(imagePath) {
  // Read the image
  const imageBuffer = fs.readFileSync(imagePath);
  
  // Decode and resize the image (model input is 224x224)
  const tfImage = tf.node.decodeImage(imageBuffer);
  const resizedImage = tf.image.resizeBilinear(tfImage, [224, 224]);
  
  // Normalize pixel values to [0, 1]
  const normalizedImage = resizedImage.div(255.0);
  
  // Add batch dimension
  const batchedImage = normalizedImage.expandDims(0);
  
  return batchedImage;
}

/**
 * Get recommendations based on the diagnosis
 * @param {string} diagnosis The diagnosis 
 * @returns {string[]} Array of recommendations
 */
function getRecommendations(diagnosis) {
  const recommendationsMap = {
    'pneumonia': [
      'Consult with a pulmonologist as soon as possible',
      'Rest and ensure adequate hydration',
      'Monitor temperature and breathing regularly',
      'Complete the full course of any prescribed antibiotics',
      'Follow up with your doctor to confirm recovery'
    ],
    'fracture': [
      'Consult with an orthopedic specialist immediately',
      'Immobilize the affected area to prevent further damage',
      'Apply ice to reduce swelling and pain',
      'Keep the affected limb elevated if possible',
      'Do not put weight on the injured area until cleared by a doctor'
    ],
    'normal': [
      'Continue regular health monitoring',
      'Maintain a healthy lifestyle with proper diet and exercise',
      'Follow up with your physician if symptoms persist or worsen',
      'Schedule regular check-ups as recommended by your healthcare provider'
    ]
  };
  
  if (diagnosis.includes('pneumonia')) {
    return recommendationsMap.pneumonia;
  } else if (diagnosis.includes('fracture')) {
    return recommendationsMap.fracture;
  } else {
    return recommendationsMap.normal;
  }
}

// Route for uploading and analyzing X-ray images
router.post('/analyze', upload.single('xrayImage'), async (req, res) => {
  try {
    // Check if there's an uploaded file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Check if model is loaded
    if (!model) {
      return res.status(500).json({ error: 'Model not loaded' });
    }
    
    const imagePath = req.file.path;
    
    // Preprocess the image
    const processedImage = await preprocessImage(imagePath);
    
    // Run inference
    const predictions = await model.predict(processedImage);
    const predictionData = await predictions.data();
    
    // Process prediction results
    // Model has different classes, for example:
    // [0] = Normal, [1] = Pneumonia, [2] = Fracture
    const classes = ['normal', 'pneumonia', 'fracture'];
    
    // Find the class with highest probability
    let maxProbIndex = 0;
    let maxProb = predictionData[0];
    
    for (let i = 1; i < predictionData.length; i++) {
      if (predictionData[i] > maxProb) {
        maxProb = predictionData[i];
        maxProbIndex = i;
      }
    }
    
    // Generate a diagnosis
    const diagnosisClass = classes[maxProbIndex];
    let diagnosis;
    
    if (diagnosisClass === 'normal') {
      diagnosis = 'No abnormalities detected';
    } else if (diagnosisClass === 'pneumonia') {
      diagnosis = 'Pneumonia detected';
    } else if (diagnosisClass === 'fracture') {
      diagnosis = 'Fracture detected';
    }
    
    // Get recommendations
    const recommendations = getRecommendations(diagnosisClass);
    
    // Create analysis result
    const result = {
      id: uuidv4(),
      diagnosis,
      confidence: maxProb,
      date: new Date(),
      recommendations
    };
    
    // Clean up - remove the temporary file
    fs.unlinkSync(imagePath);
    
    // Return the result
    res.status(200).json(result);
  } catch (error) {
    console.error('Error analyzing X-ray:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route for getting user's X-ray history
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you would fetch history from a database
    // For demonstration, we're returning mock data
    const mockHistory = [
      {
        id: 'xray-1',
        diagnosis: 'No abnormalities detected',
        confidence: 0.95,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        recommendations: [
          'Continue regular health monitoring',
          'Maintain a healthy lifestyle with proper diet and exercise',
          'Follow up with your physician if symptoms persist or worsen'
        ]
      },
      {
        id: 'xray-2',
        diagnosis: 'Pneumonia detected',
        confidence: 0.88,
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        recommendations: [
          'Consult with a pulmonologist as soon as possible',
          'Rest and ensure adequate hydration',
          'Monitor temperature and breathing regularly'
        ]
      }
    ];
    
    res.status(200).json(mockHistory);
  } catch (error) {
    console.error('Error fetching X-ray history:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route for deleting an X-ray analysis
router.delete('/:xrayId', async (req, res) => {
  try {
    const { xrayId } = req.params;
    
    // In a real app, you would delete the record from a database
    // and the associated file from storage
    
    res.status(200).json({ message: 'X-ray analysis deleted successfully' });
  } catch (error) {
    console.error('Error deleting X-ray analysis:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 