const mongoose = require('mongoose');

const bookingServiceSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, ref: 'Booking' },
  serviceId: { type: String, required: true, ref: 'Service' },
  quantity: { type: Number, required: true, min: 1 },
  totalServicePrice: { type: Number, required: true }
});

bookingServiceSchema.index({ bookingId: 1, serviceId: 1 }, { unique: true });

module.exports = mongoose.model('BookingService', bookingServiceSchema);
