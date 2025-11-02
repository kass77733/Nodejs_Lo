const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
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
  sortId: {
    type: DataTypes.INTEGER,
    field: 'sort_id',
    allowNull: false
  },
  labelId: {
    type: DataTypes.INTEGER,
    field: 'label_id',
    allowNull: false
  },
  articleCover: {
    type: DataTypes.STRING(256),
    field: 'article_cover',
    allowNull: true
  },
  articleTitle: {
    type: DataTypes.STRING(32),
    field: 'article_title',
    allowNull: false
  },
  articleContent: {
    type: DataTypes.TEXT,
    field: 'article_content',
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING(1024),
    field: 'video_url',
    allowNull: true
  },
  viewCount: {
    type: DataTypes.INTEGER,
    field: 'view_count',
    defaultValue: 0
  },
  likeCount: {
    type: DataTypes.INTEGER,
    field: 'like_count',
    defaultValue: 0
  },
  viewStatus: {
    type: DataTypes.BOOLEAN,
    field: 'view_status',
    defaultValue: true
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  tips: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  recommendStatus: {
    type: DataTypes.BOOLEAN,
    field: 'recommend_status',
    defaultValue: false
  },
  commentStatus: {
    type: DataTypes.BOOLEAN,
    field: 'comment_status',
    defaultValue: true
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
  tableName: 'article',
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'update_time'
});

module.exports = Article;
