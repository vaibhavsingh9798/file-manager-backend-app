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
  location:{
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
  subfolderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Subfolders',
      key: 'id',
      allowNull: true,
    },
  },
});

module.exports = File;
