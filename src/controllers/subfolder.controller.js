
const { Subfolder } = require('../models');
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse');
const asyncHnadler = require('../utils/asyncHandler');

exports.createSubFolder = asyncHnadler(async (req,res) => {

    const subFolder = await Subfolder.create({ ...req.body, userId: req.user.id });
    if(!subFolder){
        throw new ApiError(400,'Something wrong while creating the Subfolder') 
    }
    return res.status(201).json(new ApiResponse(200,subFolder,"Subfolder created"))

})

exports.getFolders = asyncHnadler( async (req,res) => {
 
        const subfolders = await Subfolder.findAll({ 
          where: { 
            userId: req.user.userId, 
            parentFolderId: req.params.parentFolderId 
          } 
        });
         if(!subfolders){
            throw new ApiError(400,'Something wrong while getting the Subfolders') 
         }
         return res.status(201).json(new ApiResponse(200,subfolders,"subfolder fetched"))
   
  }
)


