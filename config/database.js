const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'loblog00',
  process.env.DB_USER || 'lo7777',
  process.env.DB_PASSWORD || 'LMpmtu7vHwTie93b',
  {
    host: process.env.DB_HOST || 'mysql.sqlpub.com',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    logging: process.env.NODE_ENV === 'dev' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

module.exports = sequelize;
