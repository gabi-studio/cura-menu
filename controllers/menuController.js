const MenuItem = require('../models/menuItem');

// GET all menu items
exports.getAllMenuItems = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

// POST new menu item
exports.createMenuItem = async (req, res) => {
  const newItem = new MenuItem(req.body);
  await newItem.save();
  res.status(201).json(newItem);
};

// PUT update menu item
exports.updateMenuItem = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE menu item
exports.deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
