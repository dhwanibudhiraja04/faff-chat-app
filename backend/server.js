require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'https://faff-chat-app.vercel.app',
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

// Socket.IO
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});
require('./socket')(io);
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use(require('./routes/userRoutes'));
app.use(require('./routes/messageRoutes'));

// Mongo Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5050;
http.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
