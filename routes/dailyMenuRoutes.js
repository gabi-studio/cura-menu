const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menuItem');
const auth = require('../middleware/authMiddleware'); 

// Set one item as today's special (Admin-only)
router.post('/today/:id', auth, async (req, res) => {
  try {
    // Unset all other daily specials
    await MenuItem.updateMany({}, { isAvailableToday: false });

    // Set this one to true
    await MenuItem.findByIdAndUpdate(req.params.id, { isAvailableToday: true });

    res.json({ message: 'Daily special updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error setting daily special' });
  }
});

module.exports = router;
