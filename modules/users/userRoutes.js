const express = require('express');
const router = express.Router();
const { getAllUsers, parseCsvAndAddToDb } = require('./userController');

router.get('/', getAllUsers);
router.get('/parseCsvAndAddToDb', parseCsvAndAddToDb);

module.exports = router;
