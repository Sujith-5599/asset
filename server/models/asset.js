const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
  product_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unique_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  image_upload: {
    type: DataTypes.TEXT, // Changed to TEXT to store Base64 string
    allowNull: true
  }
});

Asset.associate = (models) => {
  Asset.hasMany(models.AssetIssue, {
    foreignKey: 'unique_id',
  });
};

Asset.sync({ alter: true })
  .then(() => {
    console.log('Asset model synced with database');
  })
  .catch(err => {
    console.error('Error syncing Asset model:', err);
  });

module.exports = Asset;
