const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING(16),
    field: 'phone_number',
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  userStatus: {
    type: DataTypes.BOOLEAN,
    field: 'user_status',
    defaultValue: true
  },
  gender: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  openId: {
    type: DataTypes.STRING(128),
    field: 'open_id',
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING(256),
    defaultValue: 'https://i.ibb.co/5RDrH3S/image.png'
  },
  admire: {
    type: DataTypes.STRING(32),
    allowNull: true
  },
  subscribe: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  introduction: {
    type: DataTypes.STRING(4096),
    allowNull: true
  },
  userType: {
    type: DataTypes.TINYINT,
    field: 'user_type',
    defaultValue: 2
  },
  updateBy: {
    type: DataTypes.STRING(32),
    field: 'update_by',
    allowNull: true
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'user',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'update_time',
  indexes: [
    {
      unique: true,
      fields: ['username']
    }
  ]
});

module.exports = User;
