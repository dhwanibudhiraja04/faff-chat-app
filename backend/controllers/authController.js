const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ name, email });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ user, token });
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.userId } }); // Exclude self
  res.json(users);
};
