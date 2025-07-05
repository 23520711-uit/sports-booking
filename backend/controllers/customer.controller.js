const Customer = require('../models/customer.model');
const Booking = require('../models/booking.model');
const BookingService = require('../models/bookingService.model');
const Service = require('../models/service.model');
const Field = require('../models/field.model');
const Facility = require('../models/facility.model');
const FieldType = require('../models/fieldType.model');

// Xem thông tin cá nhân
exports.getProfile = async (req, res) => {
  try {
    const customer = await Customer.findOne({ userId: req.user.userId });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Sửa thông tin cá nhân (họ tên, sđt)
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    await Customer.updateOne({ userId: req.user.userId }, { fullName, phone });
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Xem lịch booking
exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    const bookings = await Booking.find({
    userId,
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

//Xem lịch sử giao dịch
exports.getMyTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const now = new Date();

    const bookings = await Booking.find({
      userId,
      status: 'Confirmed',
      endTime: { $lt: now } // chỉ lấy các booking đã kết thúc
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
        promotionId: booking.promotionId || [],
        discountAmount: booking.discountAmount || 0,
        totalPrice: booking.totalPrice
      };
    }));

    res.json(detailedHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
