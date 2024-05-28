
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Employee = require('./employee');
const Asset = require('./asset');


const ReturnedAsset = sequelize.define('ReturnedAsset', {
  returnid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id'
    }
  }
});

ReturnedAsset.associate = (models) => {
  ReturnedAsset.belongsTo(models.Employee, {
    foreignKey: 'id',
    onDelete: 'CASCADE', 
  });
};

ReturnedAsset.sync({ alter: true })
  .then(() => {
    console.log('ReturnedAsset model synced with database');
  })
  .catch(err => {
    console.error('Error syncing ReturnedAsset model:', err);
  });

module.exports = ReturnedAsset;
