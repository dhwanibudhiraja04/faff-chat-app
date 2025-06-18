const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.post('/messages', auth, sendMessage);
router.get('/messages', auth, getMessages);
module.exports = router;
