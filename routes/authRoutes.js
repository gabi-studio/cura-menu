const express = require('express');
const router = express.Router();
const AdminUser = require('../models/adminUser');
const auth = require('../middleware/authMiddleware');

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await AdminUser.findOne({ username });

  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).send('Invalid credentials');
  }

  req.session.isAuthenticated = true;
  req.session.user = user; // Store user information if needed

  req.session.save(err => {
    if (err) {
      console.error('Session save error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/admin/dashboard');
  });
});

router.get('/dashboard', auth, (req, res) => {
  res.render('dashboard');
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

module.exports = router;
