const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Family = sequelize.define('Family', {
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
  bgCover: {
    type: DataTypes.STRING(256),
    field: 'bg_cover',
    allowNull: false
  },
  manCover: {
    type: DataTypes.STRING(256),
    field: 'man_cover',
    allowNull: false
  },
  womanCover: {
    type: DataTypes.STRING(256),
    field: 'woman_cover',
    allowNull: false
  },
  manName: {
    type: DataTypes.STRING(32),
    field: 'man_name',
    allowNull: false
  },
  womanName: {
    type: DataTypes.STRING(32),
    field: 'woman_name',
    allowNull: false
  },
  timing: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  countdownTitle: {
    type: DataTypes.STRING(32),
    field: 'countdown_title',
    allowNull: true
  },
  countdownTime: {
    type: DataTypes.STRING(32),
    field: 'countdown_time',
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  familyInfo: {
    type: DataTypes.STRING(1024),
    field: 'family_info',
    allowNull: true
  },
  likeCount: {
    type: DataTypes.INTEGER,
    field: 'like_count',
    defaultValue: 0
  }
}, {
  tableName: 'family',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'update_time'
});

module.exports = Family;
