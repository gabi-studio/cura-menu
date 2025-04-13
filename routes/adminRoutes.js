// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Import the authentication middleware
const MenuItem = require('../models/menuItem'); // Import the MenuItem model

// GET /admin/menu
router.get('/menu', auth, async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.render('admin/menu', { menuItems });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.post('/menu/assign-day/:id', auth, async (req, res) => {
    const { dayOfWeek } = req.body;
    try {
      await MenuItem.findByIdAndUpdate(req.params.id, { dayOfWeek });
      res.redirect('/admin/menu');
    } catch (err) {
      res.status(500).send('Error assigning day');
    }
  });
  

  module.exports = router;

