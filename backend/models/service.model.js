const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  serviceTypeId: { type: String, required: true, ref: 'ServiceType' },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Service', serviceSchema);
