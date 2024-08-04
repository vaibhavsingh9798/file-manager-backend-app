
const User = require('./user.model.js');
const Folder = require('./folder.model.js');
const Subfolder = require('./subfolder.model.js');
const File = require('./file.model.js');

// Define Associations
User.hasMany(Folder, { foreignKey: 'userId' });
User.hasMany(Subfolder, { foreignKey: 'userId' });
Folder.belongsTo(User, { foreignKey: 'userId' });
Folder.hasMany(Subfolder, { foreignKey: 'parentFolderId' });
Subfolder.belongsTo(Folder, { foreignKey: 'parentFolderId' });
Subfolder.belongsTo(User, { foreignKey: 'userId' });
Folder.hasMany(File, { foreignKey: 'folderId' });
File.belongsTo(Folder, { foreignKey: 'folderId' });
File.belongsTo(User, { foreignKey: 'userId' });



module.exports = {
  User,
  Folder,
  Subfolder,
  File,
};
