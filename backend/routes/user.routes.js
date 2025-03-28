const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Protected routes (require authentication)
router.get('/profile', protect, userController.getUserProfile);
router.put('/profile', protect, userController.updateUserProfile);
router.post('/watchlist', protect, userController.addToWatchlist);
router.delete('/watchlist/:ticker', protect, userController.removeFromWatchlist);
router.get('/watchlist', protect, userController.getWatchlist);

module.exports = router;