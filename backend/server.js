require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors({
  origin: "https://faff-chat-app.vercel.app",
  credentials: true
}));
app.use(express.json());

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "https://faff-chat-app.vercel.app",
    credentials: true
  }
});
require('./socket')(io);

app.use('/users', require('./routes/users'));
app.use('/messages', require('./routes/messages'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));