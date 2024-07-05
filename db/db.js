const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'persondb',
    password: 'admin',
    port: 5432
});

// FOr db testing ---------------------------
const addStudent = async (name) => {
    try {
        const insertQuery = `
        SELECT * FROM students
    `;
        const data = await pool.query(insertQuery);
        console.log(data.rows);
    } catch (error) {
        console.log("Error:", error);
    }
};

module.exports = pool;
