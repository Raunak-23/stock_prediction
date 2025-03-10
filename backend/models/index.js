const sequelize = require('../config/database');
const User = require('./user.model');
const Stock = require('./stock.model');
const Prediction = require('./prediction.model');
const SentimentAnalysis = require('./sentiment.model');
const UserPreference = require('./userPreference.model');

// Define relationships
// User - UserPreference relationship
User.hasMany(UserPreference, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
UserPreference.belongsTo(User, {
  foreignKey: 'userId'
});

// Stock - Prediction relationship
Stock.hasMany(Prediction, {
  foreignKey: 'stockId',
  onDelete: 'CASCADE'
});
Prediction.belongsTo(Stock, {
  foreignKey: 'stockId'
});

// Stock - SentimentAnalysis relationship
Stock.hasMany(SentimentAnalysis, {
  foreignKey: 'stockId',
  onDelete: 'CASCADE'
});
SentimentAnalysis.belongsTo(Stock, {
  foreignKey: 'stockId'
});

module.exports = {
  sequelize,
  User,
  Stock,
  Prediction,
  SentimentAnalysis,
  UserPreference
};