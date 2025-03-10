const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid user data'
      });
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    
    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      const updatedUser = await user.save();
      
      res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id)
        }
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Add stock to watchlist
// @route   POST /api/users/watchlist
// @access  Private
exports.addToWatchlist = async (req, res) => {
  try {
    const { ticker } = req.body;
    
    if (!ticker) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a ticker symbol'
      });
    }
    
    const user = await User.findById(req.user._id);
    
    // Check if ticker already exists in watchlist
    const alreadyExists = user.watchlist.find(item => item.ticker === ticker);
    
    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        error: 'Stock already in watchlist'
      });
    }
    
    // Add to watchlist
    user.watchlist.push({ ticker });
    await user.save();
    
    res.status(201).json({
      success: true,
      watchlist: user.watchlist
    });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Remove stock from watchlist
// @route   DELETE /api/users/watchlist/:ticker
// @access  Private
exports.removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Filter out the ticker to remove
    user.watchlist = user.watchlist.filter(
      item => item.ticker !== req.params.ticker
    );
    
    await user.save();
    
    res.json({
      success: true,
      watchlist: user.watchlist
    });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};

// @desc    Get user watchlist
// @route   GET /api/users/watchlist
// @access  Private
exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      watchlist: user.watchlist
    });
  } catch (error) {
    console.error('Error getting watchlist:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Server error'
    });
  }
};