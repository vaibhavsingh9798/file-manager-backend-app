const fs = require('fs');
const path = require('path');
const { Folder } = require('../models');
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse');
const asyncHnadler = require('../utils/asyncHandler');

const BASE_DIR = path.join(__dirname, '..', 'user_folders');

exports.createFolder = asyncHnadler(async (req,res) => {

    const { name } = req.body;
    const userFolderPath = path.join(BASE_DIR, req.user.id.toString());

    if (!fs.existsSync(userFolderPath)) {
      fs.mkdirSync(userFolderPath);
    }

    const folderPath = path.join(userFolderPath, name);

    if (fs.existsSync(folderPath)) {
      throw new ApiError(400,'Folder already exists')
    }

    fs.mkdirSync(folderPath);
    const folder = await Folder.create({ name, userId: req.user.id });
    if(!folder){
        throw new ApiError(400,'Something wrong while creating the folder') 
    }
    return res.status(201).json(new ApiResponse(200,folder,"folder created"))

})

exports.getFolders = asyncHnadler( async (req,res) => {

    const folders = await Folder.findAll({ where: { userId: req.user.id } });
    if(!folders){
        throw new ApiError(400,'Something wrong while getting the folders') 
    }
    return res.status(201).json(new ApiResponse(200,folders,"folder fetched"))
  }
)


