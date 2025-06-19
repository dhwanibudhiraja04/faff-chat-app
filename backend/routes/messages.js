const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post('/', async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  const msg = await Message.create({ senderId, receiverId, message });
  res.json(msg);
});

router.get('/', async (req, res) => {
  const { user1, user2, before } = req.query;
  if (!user1 || !user2) {
    return res.status(400).json({ error: 'user1 and user2 are required' });
  }

  const query = {
    $or: [
      { senderId: user1, receiverId: user2 },
      { senderId: user2, receiverId: user1 }
    ]
  };
  if (before) query.createdAt = { $lt: new Date(before) };
  const messages = await Message.find(query).sort({ createdAt: -1 }).limit(30);
  res.json({ messages });
});

module.exports = router;