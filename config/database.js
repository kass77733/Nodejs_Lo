const { Sequelize } = require('sequelize');
require('dotenv').config();

// 确保 mysql2 模块正确加载
let dialectModule;
try {
  dialectModule = require('mysql2');
} catch (error) {
  console.error('Failed to load mysql2 module:', error);
  throw new Error('Please install mysql2 package: npm install mysql2');
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'loblog00',
  process.env.DB_USER || 'lo7777',
  process.env.DB_PASSWORD || 'LMpmtu7vHwTie93b',
  {
    host: process.env.DB_HOST || 'mysql.sqlpub.com',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectModule: dialectModule, // 显式指定 dialectModule
    timezone: '+08:00',
    logging: process.env.NODE_ENV === 'dev' ? console.log : false,
    pool: {
      // Vercel serverless 环境需要更小的连接池
      max: process.env.VERCEL ? 2 : 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      // Serverless 环境下，连接应该更快释放
      evict: process.env.VERCEL ? 1000 : undefined
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

module.exports = sequelize;
