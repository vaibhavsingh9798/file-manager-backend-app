const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware.js');
const {uploadImage,deleteFile} = require('../controllers/file.controller.js')
const upload = require('../middlewares/multer.middleware.js')

router.post('/:folderId/:subfolderId?', auth, upload.single('file'), uploadImage)
router.delete('/:fileId', auth, deleteFile);

module.exports = router;
