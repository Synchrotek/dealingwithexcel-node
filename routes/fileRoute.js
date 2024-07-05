const express = require('express');
const router = express.Router();
const multerUpload = require('../middlewares/multer.js');
const { handleUploadedFile } = require('../controllers/fileController.js');
const checkFileAndExtractData = require('../middlewares/checkFileAndExtractData.js');
const { validateExcelData } = require('../middlewares/validateExcelData.js');

router.post('/file', multerUpload.single('file'), checkFileAndExtractData, validateExcelData, handleUploadedFile);

module.exports = router;