const express = require('express');
const router = express.Router();
const multerUpload = require('../middlewares/multer.js');
const { handleUploadedFile } = require('../controllers/fileController.js');
const checkFileType = require('../middlewares/checkFileType.js');

router.post('/file', multerUpload.single('file'), checkFileType, handleUploadedFile);

module.exports = router;