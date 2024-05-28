const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Login = sequelize.define('login', {
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'login',
  timestamps: false,
});

async function adminLogin(username, password) {
  try {
    const result = await Login.findOne({ where: { role: 'admin', username, password } });
    return result !== null;
  } catch (error) {
    console.error('Error during admin login:', error);
    throw error;
  }
}

async function employeeLogin(username, password) {
  try {
    const result = await Login.findOne({ where: { role: 'employee', username, password } });
    return result !== null;
  } catch (error) {
    console.error('Error during employee login:', error);
    throw error;
  }
}

Login.sync({ alter: true })
  .then(() => {
    console.log('Login model synced with database');
  })
  .catch(err => {
    console.error('Error syncing Login model:', err);
  });

module.exports = {
  adminLogin,
  employeeLogin,
};
