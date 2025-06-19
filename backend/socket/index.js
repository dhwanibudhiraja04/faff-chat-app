const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    const token = socket.handshake.auth.token;
    if (!token) return socket.disconnect();

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
      socket.join(userId);
      console.log('User connected:', userId);
    } catch {
      return socket.disconnect();
    }

    socket.on('message', async (data) => {
      // Persist message
      const msg = await Message.create({
        senderId: userId,
        receiverId: data.to,
        message: data.message,
      });
      // Emit to receiver
      io.to(data.to).emit('message', {
        senderId: userId,
        receiverId: data.to,
        message: data.message,
        createdAt: msg.createdAt,
      });
      // Emit to sender for confirmation
      socket.emit('message', {
        senderId: userId,
        receiverId: data.to,
        message: data.message,
        createdAt: msg.createdAt,
      });
    });

    socket.on('typing', (data) => {
      io.to(data.receiverId).emit('typing', { senderId: userId });
    });

    socket.on('stopTyping', (data) => {
      io.to(data.receiverId).emit('stopTyping', { senderId: userId });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', userId);
    });
  });
};