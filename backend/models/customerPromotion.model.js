const mongoose = require('mongoose');

const customerPromotionSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' },
  promotionId: { type: String, required: true, ref: 'Promotion' },
  isUsable: { type: Boolean, required: true }
});

customerPromotionSchema.index({ userId: 1, promotionId: 1 }, { unique: true });

module.exports = mongoose.model('CustomerPromotion', customerPromotionSchema);
