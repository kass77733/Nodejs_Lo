const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResourcePath = sequelize.define('ResourcePath', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  classify: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  cover: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  url: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  introduction: {
    type: DataTypes.STRING(1024),
    allowNull: true
  },
  type: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  remark: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'resource_path',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false
});

module.exports = ResourcePath;
