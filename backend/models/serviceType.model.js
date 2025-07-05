const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
  serviceTypeId: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('ServiceType', serviceTypeSchema);
