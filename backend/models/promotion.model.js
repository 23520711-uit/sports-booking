const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  promotionId: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  discountPercent: { type: Number, required: true },
  fieldTypeId: { type: String, required: true, ref: 'FieldType' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Promotion', promotionSchema);
