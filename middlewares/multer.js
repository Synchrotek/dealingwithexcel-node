const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './constants/files',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});
const multerUpload = multer({
    storage: storage,
});

module.exports = multerUpload;