const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('asset', 'postgres', 'msujith5599', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log 

});

module.exports = sequelize;
