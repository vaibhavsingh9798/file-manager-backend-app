const { DataTypes } = require('sequelize');
const {sequelize} = require('../db/index.js')

const Subfolder = sequelize.define('Subfolder', {
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
  parentFolderId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Folders',
      key: 'id',
    },
  },
});

module.exports = Subfolder;
