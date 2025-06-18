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

      socket.join(userId);

      console.log(`✅ User connected: ${userId}`);

      socket.on("message", ({ to, message }) => {
        io.to(to).emit("message", {
            senderId: userId,
            receiverId: to,
            message,
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
