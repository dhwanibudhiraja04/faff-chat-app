const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.userId;

  const saved = await Message.create({ senderId, receiverId, message });
  req.io.to(receiverId).emit("receive_message", { from: senderId, message });
  res.json({ success: true, data: saved });
};

exports.getMessages = async (req, res) => {
  const userId = req.query.userId;
  const messages = await Message.find({
    $or: [{ senderId: userId }, { receiverId: userId }]
  }).sort({ timestamp: -1 });

  res.json({ messages });
};
