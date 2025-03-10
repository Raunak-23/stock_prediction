const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Prediction = sequelize.define('Prediction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  stockId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  predictionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  predictedPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  confidenceLevel: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 1
    }
  },
  modelType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  errorMargin: {
    type: DataTypes.FLOAT
  },
  metadata: {
    type: DataTypes.JSONB
  }
}, {
  timestamps: true
});

module.exports = Prediction;