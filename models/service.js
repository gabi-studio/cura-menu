const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  priceRange: String,
  isActive: Boolean
});

module.exports = mongoose.model('Service', serviceSchema);
