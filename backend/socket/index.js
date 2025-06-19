const jwt = require('jsonwebtoken');

module.exports = (io) => {
  io.on("connection", (socket) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return socket.disconnect(true);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      socket.userId = userId; // <-- Set userId on socket
      socket.join(userId);

      console.log(`✅ User connected: ${userId}`);

      // Listen for messages from this socket
      socket.on('message', (data) => {
        // Save to DB, emit to receiver, etc.
        io.to(data.to).emit('message', {
          senderId: socket.userId,
          receiverId: data.to,
          message: data.message,
          createdAt: new Date().toISOString(),
        });
      });

      socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${userId}`);
      });

    } catch (err) {
      console.error("Socket connection error:", err.message);
      socket.disconnect(true);
    }
  });
};
