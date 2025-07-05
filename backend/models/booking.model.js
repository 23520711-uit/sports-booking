const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  userId: { type: String, required: true, ref: 'User' },
  fieldId: { type: String, required: true, ref: 'Field' },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  promotionId: { type: String, default: null, ref: 'Promotion' },
  discountAmount: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  status: { type: String, enum: ['Confirmed', 'Pending'], default: 'Confirmed' }
});

bookingSchema.index({ userId: 1, fieldId: 1, startTime: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
