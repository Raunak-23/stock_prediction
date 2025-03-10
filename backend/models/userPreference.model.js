const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserPreference = sequelize.define('UserPreference', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  stockSymbol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isWatched: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  notificationEnabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  priceAlertThreshold: {
    type: DataTypes.FLOAT
  },
  dashboardPosition: {
    type: DataTypes.INTEGER
  }
}, {
  timestamps: true
});

module.exports = UserPreference;