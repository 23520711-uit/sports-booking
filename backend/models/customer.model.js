const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref : 'User' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model('Customer', customerSchema);
