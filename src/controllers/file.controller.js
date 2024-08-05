const fs = require('fs');
const path = require('path');
const { Folder , Subfolder, File} = require('../models');
const ApiError = require('../utils/ApiError')

const ApiResponse = require('../utils/ApiResponse');
const asyncHnadler = require('../utils/asyncHandler');
const {uploadTos3} = require('../utils/s3') 

const BASE_DIR = path.join(__dirname, '..', 'user_folders');

exports.uploadImage = asyncHnadler(async (req,res) => {
    
    const user = req.user;
    const { originalname, size, key, location } = req.file;
    const { folderId, subfolderId } = req.params;
    let file = req.file
    let fileName = file.originalname
    let fileData = file.buffer
    
  console.log('file details...',fileName,fileData)
  console.log('groupId...',groupId,msg)
 
   
  const folder = await Folder.findOne({ where: { id: folderId, userId: req.user.id } });
  if (!folder) {
    throw new ApiError(404,'Folder not found or unauthorized')
  }
  let targetPath = path.join(BASE_DIR, req.user.id.toString(), folder.name);

  if (subfolderId) {
    const subfolder = await Subfolder.findOne({ where: { id: subfolderId, parentFolderId: folderId, userId: req.user.id } });
    if (!subfolder) {
      throw new ApiError(404,'Subfolder not found or unauthorized')
    }
    targetPath = path.join(targetPath, subfolder.name);
  }

  if (!fs.existsSync(targetPath)) {
    throw new ApiError(404,'Target path does not exist')
  }

  const myFileName = Date.now().toString() + path.extname(req.file.originalname);
  const filePath = path.join(targetPath, myFileName);

  fs.writeFileSync(filePath, req.file.buffer);
 

    let url = await uploadTos3(fileData,fileName)

    if(!url){
        throw new ApiError(400,'Error while uploading on image')
    }
    
    const myFile = await File.create({
        name: originalname,
        size,
        key,
        url:url,
        location : filePath,
        userId: req.user.id,
        folderId: folderId,
        subfolderId: subfolderId || null,
      });
    if(!myFile){
        throw new ApiError(500,"Something went wrong while upload file")
    }
    return res.status(201).json(new ApiResponse(200,createFile,"file created"))

})

exports.deleteFile = async (req, res) => {
    const file = await File.findByPk(req.params.fileId);

    if (!file || file.userId !== req.user.id) {
      throw new ApiError(404,'File not found or unauthorized' )
    }

    fs.unlinkSync(file.location);

    await file.destroy();

    res.status(200).json(new ApiResponse(200,null,'File deleted successfully'))

};


