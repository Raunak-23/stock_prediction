const express = require('express');
const router = express.Router();
const { Stock, Prediction } = require('../models');
require('dotenv').config();

// Middleware to verify token (placeholder)
const authMiddleware = (req, res, next) => {
  // TODO: Implement proper authentication middleware
  next();
};

// Get prediction for a stock - this meets the /api/predict requirement in the SRS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { symbol } = req.query;
    
    if (!symbol) {
      return res.status(400).json({
        error: true,
        message: 'Stock symbol is required'
      });
    }
    
    // Find the stock
    const stock = await Stock.findOne({ 
      where: { symbol: symbol.toUpperCase() } 
    });
    
    if (!stock) {
      return res.status(404).json({
        error: true,
        message: 'Stock not found'
      });
    }
    
    // Get the latest prediction for this stock
    const prediction = await Prediction.findOne({
      where: { stockId: stock.id },
      order: [['createdAt', 'DESC']]
    });
    
    // If we don't have a prediction yet or it's stale, generate a new one
    if (!prediction || isPredictionStale(prediction.createdAt)) {
      // In a real application, this would call your ML model
      // For now, we'll create a dummy prediction
      const newPrediction = await generatePrediction(stock);
      
      return res.status(200).json({
        error: false,
        data: {
          stock: {
            symbol: stock.symbol,
            name: stock.name,
            currentPrice: stock.lastPrice
          },
          prediction: newPrediction
        }
      });
    }
    
    res.status(200).json({
      error: false,
      data: {
        stock: {
          symbol: stock.symbol,
          name: stock.name,
          currentPrice: stock.lastPrice
        },
        prediction
      }
    });
  } catch (error) {
    console.error('Error fetching prediction:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error generating prediction' 
    });
  }
});

// Helper function to check if prediction is stale (older than 24 hours)
function isPredictionStale(createdAt) {
  if (!createdAt) return true;
  
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return new Date(createdAt) < twentyFourHoursAgo;
}

// Helper function to generate a prediction (placeholder for ML model)
async function generatePrediction(stock) {
  // In a real application, this would run your ML model
  // For now, we'll simulate a prediction based on current price
  
  // Random price change between -5% and +10%
  const randomChange = stock.lastPrice * (Math.random() * 0.15 - 0.05);
  const predictedPrice = stock.lastPrice + randomChange;
  
  // Random confidence level between 0.6 and 0.95
  const confidenceLevel = 0.6 + Math.random() * 0.35;
  
  // Create prediction record
  const prediction = await Prediction.create({
    stockId: stock.id,
    predictionDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    predictedPrice: Number(predictedPrice.toFixed(2)),
    confidenceLevel: Number(confidenceLevel.toFixed(2)),
    modelType: 'LSTM', // Placeholder model type
    errorMargin: Number((predictedPrice * 0.05).toFixed(2))
  });
  
  return prediction;
}

module.exports = router;