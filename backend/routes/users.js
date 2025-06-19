const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  let user = await User.findOne({ email });
  if (!user) user = await User.create({ name, email });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ user, token });
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;