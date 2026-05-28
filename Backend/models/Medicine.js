const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  pharmacistName: String,
  medicineName: String,
  manufacturer: String,
  expiryDate: String,
  quantity: Number,
  price: Number,
  prescription: Boolean

});

module.exports = mongoose.model('Medicine', medicineSchema);