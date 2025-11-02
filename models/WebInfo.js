const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const WebInfo = sequelize.define('WebInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  webName: {
    type: DataTypes.STRING(16),
    field: 'web_name',
    allowNull: false
  },
  webTitle: {
    type: DataTypes.STRING(512),
    field: 'web_title',
    allowNull: false
  },
  notices: {
    type: DataTypes.STRING(512),
    allowNull: true
  },
  footer: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  backgroundImage: {
    type: DataTypes.STRING(256),
    field: 'background_image',
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  randomAvatar: {
    type: DataTypes.TEXT,
    field: 'random_avatar',
    allowNull: true
  },
  randomName: {
    type: DataTypes.STRING(4096),
    field: 'random_name',
    allowNull: true
  },
  randomCover: {
    type: DataTypes.TEXT,
    field: 'random_cover',
    allowNull: true
  },
  waifuJson: {
    type: DataTypes.TEXT,
    field: 'waifu_json',
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'web_info',
  timestamps: false
});

module.exports = WebInfo;
