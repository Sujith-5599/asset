const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employee_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
  product_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Employee.associate = (models) => {
  Employee.hasMany(models.AssetIssue, {
    foreignKey: 'id',
  });
};

Employee.sync({ alter: true })
  .then(() => {
    console.log('Employee model synced with database');
  })
  .catch(err => {
    console.error('Error syncing Employee model:', err);
  });

module.exports = Employee;
