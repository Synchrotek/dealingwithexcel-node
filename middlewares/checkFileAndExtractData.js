const path = require('path');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const checkFileAndExtractData = (req, res, next) => {
    // File exists ? -----------------------------
    if (!req.file) {
        return res.status(400).json({
            success: false,
            error: 'No file uploaded'
        });
    }

    // File is .xlsx ? ----------------------------
    const extName = path.extname(req.file.originalname).toLowerCase();
    const mimeType = req.file.mimetype;

    if (extName !== '.xlsx' || !mimeType) {
        return res.status(400).json({
            success: false,
            error: 'Invalid file type. Only Excel files (.xlsx) are allowed.'
        });
    }

    // Extract excel file data ---------------------
    const filePath = path.join(
        __dirname,
        '..', 'constants', 'files',
        req.file.filename
    );
    console.log("filePath:", filePath);
    const result = excelToJson({
        source: fs.readFileSync(filePath),
        columnToKey: {
            A: "emailid",
            B: "name"
        }
    });
    req.excel_data = result.Sheet1;
    next();
};

module.exports = checkFileAndExtractData;
