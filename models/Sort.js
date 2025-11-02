const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sort = sequelize.define('Sort', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sortName: {
    type: DataTypes.STRING(32),
    field: 'sort_name',
    allowNull: false
  },
  sortDescription: {
    type: DataTypes.STRING(256),
    field: 'sort_description',
    allowNull: false
  },
  sortType: {
    type: DataTypes.TINYINT,
    field: 'sort_type',
    defaultValue: 1
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'sort',
  timestamps: false
});

module.exports = Sort;
