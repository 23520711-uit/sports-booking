const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  fieldId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  fieldTypeId: { type: String, required: true, ref: 'FieldType' },
  facilityId: { type: String, required: true, ref: 'Facility' },
  pricePerHour: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Maintenance'], default: 'Available' }
});

module.exports = mongoose.model('Field', fieldSchema);
