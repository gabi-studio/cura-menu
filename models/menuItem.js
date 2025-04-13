const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  ingredients: String,
  isAvailableToday: Boolean,
  quantity: Number,
  dayOfWeek: {
    type: String,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    default: null
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
