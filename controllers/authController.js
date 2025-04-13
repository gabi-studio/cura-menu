const AdminUser = require('../models/adminUser');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await AdminUser.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid username' });

  const isValid = await user.validatePassword(password);
  if (!isValid) return res.status(401).json({ message: 'Invalid password' });

  res.json({ message: 'Login successful' });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new AdminUser({ username, passwordHash });
  await newUser.save();
  res.status(201).json({ message: 'Admin registered' });
};
