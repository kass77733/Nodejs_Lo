const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HistoryInfo = sequelize.define('HistoryInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: true
  },
  ip: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  nation: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  province: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(64),
    allowNull: true
  }
}, {
  tableName: 'history_info',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false
});

module.exports = HistoryInfo;
