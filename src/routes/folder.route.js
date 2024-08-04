const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware.js');
const {createFolder,getFolders} = require('../controllers/folder.controller.js')

router.post('/', auth, createFolder)

router.get('/', auth,getFolders)

module.exports = router;
