const pool = require('../db/db.js');
const sendMail = require('../utils/sendmail.js');

const handleUploadedFile = async (req, res) => {
    try {
        const excelData = req.excel_data;
        // await syncWithDb(result.Sheet1);
        const checkQuery = 'SELECT * FROM students WHERE "emailid"=$1;';
        const insertQuery = `
            INSERT INTO students ("emailid", "name")
            VALUES ($1, $2);
        `;
        const updateQuery = `
            UPDATE students 
            SET "name"=$1 WHERE "emailid"=$2;
        `
        // sync data in db ------------------------------------------
        for (let i = 1; i < excelData.length; i++) {
            const row = excelData[i];
            const primaryKey = row.emailid;
            const chekIfExists = await pool.query(checkQuery, [primaryKey]);
            if (chekIfExists.rowCount === 0) {
                await pool.query(insertQuery, [primaryKey, row.name]);
                // console.log("insert Data");
            } else {
                await pool.query(updateQuery, [row.name, primaryKey]);
                // console.log("update Data");
            }
        }
        sendMail({
            email: "useremail@emaill.com",
            success: true,
            attachmentFileName: req.file.filename
        });
        res.json({
            success: true,
            status: 'SUCCESS',
            data: excelData
        });
    } catch (error) {
        res.json({
            success: false,
            status: 'FAILED',
            error
        });
    }

}

module.exports = {
    handleUploadedFile
}

