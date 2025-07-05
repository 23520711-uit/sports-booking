const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  facilityId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Facility', facilitySchema);
