const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.get('/', auth, getAllUsers);

module.exports = router;