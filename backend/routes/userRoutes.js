const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

router.post('/users', registerUser);
module.exports = router;
