const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middleware/authMiddleware');

// Public: Get all menu items
router.get('/', menuController.getAllMenuItems);

// Admin-only: Create, update, delete
router.post('/', auth, menuController.createMenuItem);
router.put('/:id', auth, menuController.updateMenuItem);
router.delete('/:id', auth, menuController.deleteMenuItem);

module.exports = router;
