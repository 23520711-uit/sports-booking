const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const Booking = require('../models/booking.model');
const BookingService = require('../models/bookingService.model');
const Service = require('../models/service.model');
const Field = require('../models/field.model');
const Facility = require('../models/facility.model');
const FieldType = require('../models/fieldType.model');

// 1. Lấy danh sách tất cả khách hàng
exports.getAllCustomers = async (req, res) => {
  try {
    const customerUsers = await User.find({ role: 'Customer' });
    const customerDetails = await Customer.find({
      userId: { $in: customerUsers.map(u => u.userId) }
    });

    const result = customerUsers.map(u => {
      const detail = customerDetails.find(c => c.userId === u.userId);
      return {
        userId: u.userId,
        email: u.email,
        fullName: detail?.fullName || '',
        phone: detail?.phone || ''
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Lấy lịch đặt sân của một khách hàng
exports.getCustomerBookings = async (req, res) => {
  try {
    const { customerId } = req.params;
    const now = new Date();

    const bookings = await Booking.find({
      userId: customerId,
      status: 'Confirmed',
      endTime: { $gt: now }
    });

    const detailedBookings = await Promise.all(bookings.map(async booking => {
      const field = await Field.findOne({ fieldId: booking.fieldId });
      const facility = await Facility.findOne({ facilityId: field.facilityId });
      const fieldType = await FieldType.findOne({ fieldTypeId: field.fieldTypeId });

      const servicesUsed = await BookingService.find({ bookingId: booking.bookingId });
      const serviceDetails = await Promise.all(servicesUsed.map(async s => {
        const service = await Service.findOne({ serviceId: s.serviceId });
        return {
          name: service.name,
          quantity: s.quantity,
          total: s.totalServicePrice
        };
      }));

      return {
        bookingId: booking.bookingId,
        bookingDate: booking.bookingDate,
        fieldName: field.name,
        facilityName: facility.name,
        address: facility.address,
        fieldType: fieldType.name,
        size: fieldType.size,
        surface: fieldType.surface,
        startTime: booking.startTime,
        durationMinutes: (booking.endTime - booking.startTime) / 60000,
        services: serviceDetails
      };
    }));

    res.json(detailedBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Lấy lịch sử giao dịch của một khách hàng
exports.getCustomerTransactions = async (req, res) => {
  try {
    const { customerId } = req.params;
    const now = new Date();

    const bookings = await Booking.find({
      userId: customerId,
      status: 'Confirmed',
      endTime: { $lt: now }
    });

    const detailedHistory = await Promise.all(bookings.map(async booking => {
      const field = await Field.findOne({ fieldId: booking.fieldId });
      const facility = await Facility.findOne({ facilityId: field.facilityId });

      const servicesUsed = await BookingService.find({ bookingId: booking.bookingId });
      const serviceDetails = await Promise.all(servicesUsed.map(async s => {
        const service = await Service.findOne({ serviceId: s.serviceId });
        return {
          name: service.name,
          quantity: s.quantity,
          total: s.totalServicePrice
        };
      }));

      return {
        bookingId: booking.bookingId,
        bookingDate: booking.bookingDate,
        startTime: booking.startTime,
        durationMinutes: (booking.endTime - booking.startTime) / 60000,
        fieldName: field.name,
        facilityName: facility.name,
        address: facility.address,
        services: serviceDetails,
        promotionId: booking.promotionId || null,
        discountAmount: booking.discountAmount || 0,
        totalPrice: booking.totalPrice
      };
    }));

    res.json(detailedHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
