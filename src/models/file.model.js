const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/index.js')

const File = sequelize.define('File', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.INTEGER,
   // allowNull: false,
  },
  key: {
    type: DataTypes.STRING,
   // allowNull: false,
  },
  url: {
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
  folderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Folders',
      key: 'id',
    },
  },
});

module.exports = File;
