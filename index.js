const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

// middleware ---------------------
app.use(express.json());

// Routes --------------------------
const fileRoutes = require('./routes/fileRoute.js');
app.use('/', fileRoutes);

app.listen(PORT, () => {
    console.log('Server running on Port:', PORT);
});