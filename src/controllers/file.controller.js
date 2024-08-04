
const { Folder } = require('../models');
const ApiError = require('../utils/ApiError')
const  {User}  = require('../models')
const ApiResponse = require('../utils/ApiResponse');
const asyncHnadler = require('../utils/asyncHandler');

exports.createFolder = asyncHnadler(async (req,res) => {

    const folder = await Folder.create({ ...req.body, userId: req.user.id });
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


