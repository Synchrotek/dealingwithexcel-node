const path = require('path');

const checkFileType = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded'
        });
    }

    const extName = path.extname(req.file.originalname).toLowerCase();
    const mimeType = req.file.mimetype;

    if (extName === '.xlsx' && mimeType) {
        return next();
    } else {
        return res.status(400).json({
            success: false,
            error: 'Invalid file type. Only Excel files (.xlsx) are allowed.'
        });
    }
};

module.exports = checkFileType;
