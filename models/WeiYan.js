const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WeiYan = sequelize.define('WeiYan', {
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
  likeCount: {
    type: DataTypes.INTEGER,
    field: 'like_count',
    defaultValue: 0
  },
  content: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  source: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    field: 'is_public',
    defaultValue: false
  }
}, {
  tableName: 'wei_yan',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false,
  indexes: [
    {
      fields: ['user_id']
    }
  ]
});

module.exports = WeiYan;
