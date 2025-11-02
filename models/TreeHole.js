const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TreeHole = sequelize.define('TreeHole', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  avatar: {
    type: DataTypes.STRING(256),
    allowNull: true
  },
  message: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
}, {
  tableName: 'tree_hole',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false
});

module.exports = TreeHole;
