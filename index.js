const express = require('express');
const app = express();
require('dotenv').config();
const { initTableIfNotExists } = require('./helpers/utilities');
const userRoutes = require('./modules/users/userRoutes');

app.use(express.json());

initTableIfNotExists();

app.get('/', (req, res) => {
    res.send('Hello from csv-to-json-api');
});

app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});
