const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SentimentAnalysis = sequelize.define('SentimentAnalysis', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  stockId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  magnitude: {
    type: DataTypes.FLOAT
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING
  },
  url: {
    type: DataTypes.STRING
  },
  content: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true
});

module.exports = SentimentAnalysis;