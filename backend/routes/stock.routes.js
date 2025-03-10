const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Stock } = require('../models');
require('dotenv').config();

// Middleware to verify token (will be implemented in middleware folder)
const authMiddleware = (req, res, next) => {
  // TODO: Implement proper authentication middleware
  next();
};

// Get all stocks
router.get('/', authMiddleware, async (req, res) => {
  try {
    const stocks = await Stock.findAll();
    
    res.status(200).json({
      error: false,
      data: stocks
    });
  } catch (error) {
    console.error('Error fetching stocks:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error fetching stocks' 
    });
  }
});

// Get stock by symbol - this meets the /api/stocks/{symbol} requirement in the SRS
router.get('/:symbol', authMiddleware, async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Try to get from database first
    let stock = await Stock.findOne({ 
      where: { symbol: symbol.toUpperCase() } 
    });
    
    // If not found in database or data is stale, fetch from external API
    if (!stock || isDataStale(stock.lastUpdated)) {
      try {
        // This would be a real API call in production
        const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );
        
        const stockData = response.data['Global Quote'];
        
        if (stockData && stockData['01. symbol']) {
          // Update or create stock in database
          const stockInfo = {
            symbol: stockData['01. symbol'],
            lastPrice: parseFloat(stockData['05. price']),
            change: parseFloat(stockData['09. change']),
            changePercent: parseFloat(stockData['10. change percent'].replace('%', '')),
            lastUpdated: new Date(),
            name: symbol.toUpperCase() // In a real app, you would fetch the company name
          };
          
          if (stock) {
            // Update existing record
            await Stock.update(stockInfo, { where: { id: stock.id } });
            stock = await Stock.findByPk(stock.id);
          } else {
            // Create new record
            stock = await Stock.create(stockInfo);
          }
        } else {
          return res.status(404).json({
            error: true,
            message: 'Stock not found'
          });
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        
        // If we have stale data, return it with a warning
        if (stock) {
          return res.status(200).json({
            error: false,
            warning: 'Using cached data. Could not fetch latest stock information.',
            data: stock
          });
        }
        
        return res.status(500).json({
          error: true,
          message: 'Error fetching stock data from external API'
        });
      }
    }
    
    res.status(200).json({
      error: false,
      data: stock
    });
  } catch (error) {
    console.error('Error fetching stock:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error fetching stock' 
    });
  }
});

// Helper function to check if data is stale (older than 15 minutes)
function isDataStale(lastUpdated) {
  if (!lastUpdated) return true;
  
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  return new Date(lastUpdated) < fifteenMinutesAgo;
}

module.exports = router;