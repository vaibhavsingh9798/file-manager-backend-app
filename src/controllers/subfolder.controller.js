const fs = require('fs');
const path = require('path');
const {Folder, Subfolder } = require('../models');
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse');
const asyncHnadler = require('../utils/asyncHandler');

const BASE_DIR = path.join(__dirname, '..', 'user_folders'); 

exports.createSubFolder = asyncHnadler(async (req,res) => {
    const { name, parentFolderId } = req.body;

    const parentFolder = await Folder.findByPk(parentFolderId);
    if (!parentFolder || parentFolder.userId !== req.user.id) {
      throw new  ApiError(404,'Parent folder not found or unauthorized')
    }

    const userFolderPath = path.join(BASE_DIR, req.user.id.toString());
    const parentFolderPath = path.join(userFolderPath, parentFolder.name);

    if (!fs.existsSync(parentFolderPath)) {
      throw new  ApiError(404,'Parent folder does not exist in the file system')
    }

    const subfolderPath = path.join(parentFolderPath, name);

    if (fs.existsSync(subfolderPath)) {
      throw new  ApiError(404,'Subfolder already exists')
    }

    fs.mkdirSync(subfolderPath);

    const subfolder = await Subfolder.create({ name, userId: req.user.id, parentFolderId })
    if(!subfolder){
        throw new ApiError(400,'Something wrong while creating the Subfolder') 
    }
    return res.status(201).json(new ApiResponse(200,subfolder,"Subfolder created"))

})

exports.getSubFolders = asyncHnadler( async (req,res) => {
 
        const subfolders = await Subfolder.findAll({ 
          where: { 
            userId: req.user.id, 
            parentFolderId: req.params.parentFolderId 
          } 
        });
         if(!subfolders){
            throw new ApiError(400,'Something wrong while getting the Subfolders') 
         }
         return res.status(201).json(new ApiResponse(200,subfolders,"subfolder fetched"))
   
  }
)


