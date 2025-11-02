const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  source: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  parentCommentId: {
    type: DataTypes.INTEGER,
    field: 'parent_comment_id',
    defaultValue: 0
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false
  },
  floorCommentId: {
    type: DataTypes.INTEGER,
    field: 'floor_comment_id',
    allowNull: true
  },
  parentUserId: {
    type: DataTypes.INTEGER,
    field: 'parent_user_id',
    allowNull: true
  },
  likeCount: {
    type: DataTypes.INTEGER,
    field: 'like_count',
    defaultValue: 0
  },
  commentContent: {
    type: DataTypes.STRING(1024),
    field: 'comment_content',
    allowNull: false
  },
  commentInfo: {
    type: DataTypes.STRING(256),
    field: 'comment_info',
    allowNull: true
  }
}, {
  tableName: 'comment',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: false,
  indexes: [
    {
      fields: ['source']
    }
  ]
});

module.exports = Comment;
