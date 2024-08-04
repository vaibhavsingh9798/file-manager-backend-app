const {Sequelize, Model} = require('sequelize')


const {PGDATABASE,PGUSER,PGPASSWORD,PGHOST,ENDPOINT_ID } = process.env
const sequelize = new Sequelize(PGDATABASE,PGUSER,PGPASSWORD,{
    host : PGHOST,
    dialect: 'postgres',
    port: 5432, 
    ssl: 'require',
    dialectOptions: {
        ssl: {
          require: process.env.DB_SSL === 'true',
          rejectUnauthorized: false // If you have a self-signed certificate, set this to false
        }
    }
})

const User = require('../models/user.model.js')(sequelize);
// const Folder = require('./models/folder')(sequelize);
// const Subfolder = require('./models/subfolder')(sequelize);
// const File = require('./models/file')(sequelize);

// Define associations
// User.hasMany(Folder, { foreignKey: 'userId' });
// Folder.belongsTo(User, { foreignKey: 'userId' });

// Folder.hasMany(Subfolder, { foreignKey: 'folderId' });
// Subfolder.belongsTo(Folder, { foreignKey: 'folderId' });

// Subfolder.hasMany(File, { foreignKey: 'subfolderId' });
// File.belongsTo(Subfolder, { foreignKey: 'subfolderId' });

sequelize.sync({force:true})
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((err) => console.log('db connection error',err))

module.exports = {
  User,
//   Folder,
//   Subfolder,
//   File,
  sequelize,
};
