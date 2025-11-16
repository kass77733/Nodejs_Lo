const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TokenCache = sequelize.define('token_cache', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cacheKey: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'cache_key'
  },
  cacheValue: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: 'cache_value'
  },
  expireAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expire_at',
    index: true
  }
}, {
  timestamps: false,
  tableName: 'token_cache',
  indexes: [
    { fields: ['cache_key'], unique: true },
    { fields: ['expire_at'] }
  ]
});

module.exports = TokenCache;
