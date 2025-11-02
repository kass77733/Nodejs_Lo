const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  path: {
    type: DataTypes.STRING(256),
    allowNull: false,
    unique: true
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  originalName: {
    type: DataTypes.STRING(512),
    field: 'original_name',
    allowNull: true
  },
  mimeType: {
    type: DataTypes.STRING(256),
    field: 'mime_type',
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  storeType: {
    type: DataTypes.STRING(16),
    field: 'store_type',
    allowNull: true
  }
}, {
  tableName: 'resource',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false,
  indexes: [
    {
      unique: true,
      fields: ['path']
    }
  ]
});

module.exports = Resource;
