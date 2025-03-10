const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Stock = sequelize.define('Stock', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sector: {
    type: DataTypes.STRING
  },
  industry: {
    type: DataTypes.STRING
  },
  lastPrice: {
    type: DataTypes.FLOAT
  },
  change: {
    type: DataTypes.FLOAT
  },
  changePercent: {
    type: DataTypes.FLOAT
  },
  lastUpdated: {
    type: DataTypes.DATE
  },
  metadata: {
    type: DataTypes.JSONB
  }
}, {
  timestamps: true
});

module.exports = Stock;