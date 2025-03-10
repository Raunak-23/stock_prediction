const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Initialize express app
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Import routes
const stockRoutes = require('./routes/stock.routes');
const authRoutes = require('./routes/auth.routes');
const predictionRoutes = require('./routes/prediction.routes');
const sentimentRoutes = require('./routes/sentiment.routes');
const userRoutes = require('./routes/user.routes');

// API routes
app.use('/api/stocks', stockRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/predict', predictionRoutes);
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to Stock Market Prediction API',
    version: '1.0'
  });
});

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({
    error: true,
    message: 'Endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;