const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/index.js')

const Folder = sequelize.define('Folder', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
});

module.exports = Folder;
