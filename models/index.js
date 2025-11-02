const sequelize = require('../config/database');

// 导入所有模型
const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');
const WebInfo = require('./WebInfo');
const Sort = require('./Sort');
const Label = require('./Label');
const Resource = require('./Resource');
const ResourcePath = require('./ResourcePath');
const HistoryInfo = require('./HistoryInfo');
const Family = require('./Family');
const TreeHole = require('./TreeHole');
const WeiYan = require('./WeiYan');

// 定义关联关系
// User 和 Article 的关系
User.hasMany(Article, { foreignKey: 'userId', as: 'articles' });
Article.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User 和 Comment 的关系
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Sort 和 Article 的关系
Sort.hasMany(Article, { foreignKey: 'sortId', as: 'articles' });
Article.belongsTo(Sort, { foreignKey: 'sortId', as: 'sort' });

// Label 和 Article 的关系
Label.hasMany(Article, { foreignKey: 'labelId', as: 'articles' });
Article.belongsTo(Label, { foreignKey: 'labelId', as: 'label' });

// Sort 和 Label 的关系
Sort.hasMany(Label, { foreignKey: 'sortId', as: 'labels' });
Label.belongsTo(Sort, { foreignKey: 'sortId', as: 'sort' });

// User 和 Resource 的关系
User.hasMany(Resource, { foreignKey: 'userId', as: 'resources' });
Resource.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Article,
  Comment,
  WebInfo,
  Sort,
  Label,
  Resource,
  ResourcePath,
  HistoryInfo,
  Family,
  TreeHole,
  WeiYan
};
