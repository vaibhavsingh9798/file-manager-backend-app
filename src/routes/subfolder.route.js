const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware.js');
const {createSubFolder, getSubFolders} = require('../controllers/subfolder.controller.js')

router.post('/', auth, createSubFolder)

router.get('/:parentFolderId', auth, getSubFolders)

module.exports = router;
