const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 
const linkRoutes = require('./routes/linkRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/links', linkRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});
