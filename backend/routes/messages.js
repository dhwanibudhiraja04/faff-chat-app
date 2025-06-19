const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/', async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const msg = await Message.create({ senderId, receiverId, message });
  res.json(msg);
});

router.get('/', async (req, res) => {
  const { userId, before } = req.query;
  const query = {
    $or: [{ senderId: userId }, { receiverId: userId }]
  };
  if (before) query.createdAt = { $lt: new Date(before) };
  const messages = await Message.find(query).sort({ createdAt: -1 }).limit(30);
  res.json({ messages });
});

module.exports = router;