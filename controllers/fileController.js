const path = require('path');
const pool = require('../db/db.js');
// const readXlsxFile = require('read-excel-file/node');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

const handleUploadedFile_old = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            success: false,
            Error: 'NO file uplodaded or Invalid fileType.'
        });
    }
    try {
        const filePath = path.join(
            __dirname,
            '..', 'files',
            req.file.filename
        );
        const rows = await readXlsxFile(filePath);
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const primaryKeyValue = row[0];

            // check if row exists -------------------
            const checkQuery = 'SELECT * FROM students WHERE "emailid"=$1;';
            const checkResult = await pool.query(checkQuery, [primaryKeyValue]);

            console.log(primaryKeyValue);
            console.log(checkResult.rows);

            if (checkResult.rowCount === 0) {
                const insertQuery = `
                    INSERT INTO students ("emailid", "name")
                    VALUES ($1, $2);
                `;
                await pool.query(insertQuery, [row[0], row[1]]);
            }
        }
        res.json({
            success: true,
            message: 'Inserting done',
            data: rows
        });
    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
}

const handleUploadedFile = async (req, res) => {
    try {
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
        res.json({
            success: true,
            data: result
        })

    } catch (error) {
        res.json({
            success: false,
            error
        });
    }
}

module.exports = {
    handleUploadedFile
}

