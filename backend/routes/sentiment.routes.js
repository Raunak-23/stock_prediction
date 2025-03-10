const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Stock, SentimentAnalysis } = require('../models');
require('dotenv').config();

// Middleware to verify token (placeholder)
const authMiddleware = (req, res, next) => {
  // TODO: Implement proper authentication middleware
  next();
};

// Get sentiment analysis for a stock - this meets the /api/sentiment requirement in the SRS
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
    
    // Get recent sentiment analyses for this stock
    const sentiments = await SentimentAnalysis.findAll({
      where: { stockId: stock.id },
      order: [['date', 'DESC']],
      limit: 10
    });
    
    // If we don't have recent sentiment data, generate new data
    if (sentiments.length === 0 || isSentimentStale(sentiments[0].date)) {
      // In a real application, this would call your news API and sentiment analysis model
      // For now, we'll create dummy sentiment data
      const newSentiments = await generateSentimentData(stock);
      
      return res.status(200).json({
        error: false,
        data: {
          stock: {
            symbol: stock.symbol,
            name: stock.name
          },
          sentiments: newSentiments,
          summary: calculateSentimentSummary(newSentiments)
        }
      });
    }
    
    res.status(200).json({
      error: false,
      data: {
        stock: {
          symbol: stock.symbol,
          name: stock.name
        },
        sentiments,
        summary: calculateSentimentSummary(sentiments)
      }
    });
  } catch (error) {
    console.error('Error fetching sentiment:', error);
    res.status(500).json({ 
      error: true, 
      message: 'Error generating sentiment analysis' 
    });
  }
});

// Helper function to check if sentiment data is stale (older than 6 hours)
function isSentimentStale(date) {
  if (!date) return true;
  
  const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
  return new Date(date) < sixHoursAgo;
}

// Helper function to generate sentiment data (placeholder for news API and sentiment analysis)
async function generateSentimentData(stock) {
  // In a real application, this would fetch news articles and run sentiment analysis
  // For now, we'll simulate sentiment data
  
  const sources = [
    'Financial Times', 'Bloomberg', 'CNBC', 'Reuters', 
    'Wall Street Journal', 'MarketWatch', 'Yahoo Finance'
  ];
  
  const headlines = [
    `${stock.name} Reports Strong Quarterly Results`,
    `Analysts Lower Target Price for ${stock.name}`,
    `${stock.name} Announces New Product Line`,
    `${stock.name} CEO Discusses Future Growth`,
    `Market Uncertainty Affects ${stock.name} Stock`,
    `${stock.name} Announces Expansion Plans`,
    `Investors Remain Cautious About ${stock.name}`
  ];
  
  const sentiments = [];
  
  // Generate 5 random sentiment records
  for (let i = 0; i < 5; i++) {
    // Random sentiment score between -1 (negative) and 1 (positive)
    const score = Number((Math.random() * 2 - 1).toFixed(2));
    // Random magnitude between 0.5 and 1.5
    const magnitude = Number((0.5 + Math.random()).toFixed(2));
    
    // Random date within the last 24 hours
    const hours = Math.floor(Math.random() * 24);
    const date = new Date(Date.now() - hours * 60 * 60 * 1000);
    
    // Random source and headline
    const source = sources[Math.floor(Math.random() * sources.length)];
    const headline = headlines[Math.floor(Math.random() * headlines.length)];
    
    // Create sentiment record
    const sentiment = await SentimentAnalysis.create({
      stockId: stock.id,
      date,
      score,
      magnitude,
      source,
      title: headline,
      url: `https://example.com/news/${stock.symbol}/${i}`,
      content: `This is a simulated news article about ${stock.name}.`
    });
    
    sentiments.push
  }
}