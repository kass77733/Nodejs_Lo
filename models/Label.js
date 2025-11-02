const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Label = sequelize.define('Label', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sortId: {
    type: DataTypes.INTEGER,
    field: 'sort_id',
    allowNull: false
  },
  labelName: {
    type: DataTypes.STRING(32),
    field: 'label_name',
    allowNull: false
  },
  labelDescription: {
    type: DataTypes.STRING(256),
    field: 'label_description',
    allowNull: false
  }
}, {
  tableName: 'label',
  timestamps: false
});

module.exports = Label;
