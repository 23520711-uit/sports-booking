const Field = require('../models/field.model');
const Booking = require('../models/booking.model');
const BookingService = require('../models/bookingService.model');
const Promotion = require('../models/promotion.model');
const CustomerPromotion = require('../models/customerPromotion.model');
const Facility = require('../models/facility.model');
const FieldType = require('../models/fieldType.model');
const Service = require('../models/service.model');
const ServiceType = require('../models/serviceType.model');
const emailService = require('../services/email.service');
const User = require('../models/user.model');
const generateId = require('../utils/generateId');
const validateBookingTime = require('../utils/validateBookingTime');

// Lấy danh sách các loại sân
exports.getFieldTypes = async (req, res) => {
  try {
    const fieldTypes = await FieldType.find();
    res.json(fieldTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách các cơ sở
exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách các loại dịch vụ
exports.getServiceTypes = async (req, res) => {
  try {
    const serviceTypes = await ServiceType.find();
    res.json(serviceTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách các dịch vụ
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách khuyến mãi của khách hàng
exports.getMyPromotions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const usablePromos = await CustomerPromotion.find({ userId, isUsable: true });

    const promotions = await Promotion.find({
      promotionId: { $in: usablePromos.map(p => p.promotionId) }
    });

    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về danh sách sân còn khung giờ trống trong ngày được chọn
exports.searchAvailableFields = async (req, res) => {
  try {
    const { date, location, fieldTypeId, size, surface } = req.query;
    if (!date) return res.status(400).json({ message: 'Date is required' });

    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);

    // Bước 1: Lọc FieldTypes theo bộ lọc
    const fieldTypeFilter = {};
    if (fieldTypeId) fieldTypeFilter.fieldTypeId = fieldTypeId;
    if (size) fieldTypeFilter.size = size;
    if (surface) fieldTypeFilter.surface = surface;

    const matchedFieldTypes = await FieldType.find(fieldTypeFilter);
    const fieldTypeIds = matchedFieldTypes.map(ft => ft.fieldTypeId);

    // Bước 2: Lọc cơ sở theo location nếu có
    const facilityFilter = {};
    if (location) facilityFilter.address = { $regex: location, $options: 'i' };

    const matchedFacilities = await Facility.find(facilityFilter);
    const facilityIds = matchedFacilities.map(f => f.facilityId);

    // Bước 3: Lọc Field theo loại sân và cơ sở đã lọc
    const fieldFilter = {
      fieldTypeId: { $in: fieldTypeIds },
      facilityId: { $in: facilityIds },
      status: 'Available'
    };

    const fields = await Field.find(fieldFilter);

    // Bước 4: Lấy danh sách booking trong ngày đó
    const bookings = await Booking.find({
      fieldId: { $in: fields.map(f => f.fieldId) },
      startTime: { $gte: dayStart, $lte: dayEnd },
    });

    // Bước 5: Ghép sân với các khung giờ đã được đặt
    const result = fields.map(field => {
      const relatedBookings = bookings.filter(b => b.fieldId === field.fieldId);
      return {
        field,
        bookings: relatedBookings
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mảng các khung giờ 30 phút từ 07:30 đến 21:30
function generateTimeSlots() {
  const slots = [];
  let hour = 7;
  let minute = 30;
  while (hour < 21 || (hour === 21 && minute <= 30)) {
    slots.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    minute += 30;
    if (minute >= 60) {
      hour += 1;
      minute = 0;
    }
  }
  return slots;
}

function toDateTime(dateStr, timeStr) {
  return new Date(`${dateStr}T${timeStr}:00`);
}

// Trả về các khung giờ bắt đầu khả dụng cho một sân
exports.getAvailableStartTimes = async (req, res) => {
  try {
    const { fieldId, date } = req.query;
    if (!fieldId || !date) return res.status(400).json({ message: 'Missing fieldId or date' });

    const dayStart = new Date(`${date}T00:00:00`);
    const dayEnd = new Date(`${date}T23:59:59`);

    const bookings = await Booking.find({
      fieldId,
      startTime: { $gte: dayStart, $lte: dayEnd },
    });

    const slots = generateTimeSlots();
    const availableStartTimes = [];

    for (let i = 0; i < slots.length; i++) {
      const start = toDateTime(date, slots[i]);
      const end = new Date(start.getTime() + 30 * 60 * 1000);

      const conflict = bookings.some(b =>
        !(end <= b.startTime || start >= b.endTime)
      );

      if (!conflict) availableStartTimes.push(slots[i]);
    }

    res.json({ availableStartTimes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Trả về các khoảng thời gian sử dụng hợp lệ (0:30, 1:00, 1:30...) tính từ thời gian bắt đầu
exports.getValidDurations = async (req, res) => {
  try {
    const { fieldId, date, startTime } = req.query;
    if (!fieldId || !date || !startTime) {
      return res.status(400).json({ message: 'Missing fieldId, date or startTime' });
    }

    const start = new Date(`${date}T${startTime}:00`);

    // Giờ kết thúc tối đa là 21:30
    const maxEnd = new Date(`${date}T21:30:00`);

    // Lấy tất cả các booking từ thời điểm bắt đầu trở đi
    const bookings = await Booking.find({
      fieldId,
      startTime: { $gt: start },
      endTime: { $gt: start },
    }).sort({ startTime: 1 });

    const validDurations = [];
    let currentEnd = new Date(start.getTime() + 30 * 60 * 1000); // +30 phút
    const maxDuration = 4 * 60 * 60 * 1000; // 4 tiếng là tối đa cho ví dụ

    while (currentEnd <= maxEnd && (currentEnd - start <= maxDuration)) {
      // Nếu xung đột với booking khác thì dừng lại
      const conflict = bookings.some(b =>
        !(currentEnd <= b.startTime || start >= b.endTime)
      );
      if (conflict) break;

      // Thêm thời lượng tính bằng giờ:phút
      const diffMs = currentEnd - start;
      const minutes = diffMs / 1000 / 60;
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      const label = `${hours}:${mins === 0 ? '00' : '30'}`;
      validDurations.push(label);

      currentEnd = new Date(currentEnd.getTime() + 30 * 60 * 1000); // tăng thêm 30 phút
    }

    res.json({ validDurations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo booking mới (chờ thanh toán)
exports.createBooking = async (req, res) => {
  try {
    const {
      fieldId,
      startTime,       // ISO format string
      duration,        // ví dụ: "1:30"
      serviceList,     // mảng { serviceId, quantity }
      promotionCode,
    } = req.body;

    const userId = req.user.userId; // đã được decode từ token

    const start = new Date(startTime);
    const [hours, minutes] = duration.split(':').map(Number);
    const end = new Date(start.getTime() + (hours * 60 + minutes) * 60000);

    const validation = validateBookingTime(start, end);
    if (!validation.valid) {
    return res.status(400).json({ message: validation.message });
    }

    // Kiểm tra xung đột với sân đã được đặt
    const conflict = await Booking.findOne({
      fieldId,
      $or: [
        { startTime: { $lt: end }, endTime: { $gt: start } },
      ],
    });

    if (conflict) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    // Tính tổng giá dịch vụ
    let totalServicePrice = 0;
    for (const item of serviceList) {
      const service = await Service.findOne({ serviceId: item.serviceId });
      if (!service) continue;
      totalServicePrice += service.price * item.quantity;
    }

    // Tính tiền thuê sân (theo giờ)
    const field = await require('../models/field.model').findOne({ fieldId });
    const totalMinutes = (end - start) / 60000;
    const totalFieldPrice = field.pricePerHour * (totalMinutes / 60);

    let totalPrice = totalFieldPrice + totalServicePrice;
    let discountAmount = 0;
    let promotionId = null;

    // Áp dụng khuyến mãi nếu có
    if (promotionCode) {
      const promo = await Promotion.findOne({ code: promotionCode });
      const customerPromo = await CustomerPromotion.findOne({
        userId,
        promotionId: promo?.promotionId,
        isUsable: true
      });

      if (promo && customerPromo) {
        const now = new Date();
        if (promo.startDate <= now && promo.endDate >= now) {
          discountAmount = totalPrice * (promo.discountPercent / 100);
          totalPrice -= discountAmount;
          promotionId = promo.promotionId;
        }
      }
    }

    // Tạo booking
    const bookingId = generateId('BOOK');
    await Booking.create({
      bookingId,
      userId,
      fieldId,
      startTime: start,
      endTime: end,
      status: 'Pending',
      totalPrice,
      bookingDate: new Date(),
      promotionId,
      discountAmount
    });

    // Ghi các dịch vụ
    for (const item of serviceList) {
      const service = await Service.findOne({ serviceId: item.serviceId });
      if (!service) continue;
      await BookingService.create({
        bookingId,
        serviceId: item.serviceId,
        quantity: item.quantity,
        totalServicePrice: service.price * item.quantity
      });
    }

    res.status(201).json({
      message: 'Booking created',
      bookingId,
      totalFieldPrice,
      totalServicePrice,
      discountAmount,
      totalPrice
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Xác nhận thanh toán cho booking
exports.confirmBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.userId;

    const booking = await Booking.findOne({ bookingId, userId });

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'Pending') {
      return res.status(400).json({ message: 'Booking already confirmed or expired' });
    }

    // Cập nhật trạng thái và ngày thanh toán
    booking.status = 'Confirmed';
    booking.bookingDate = new Date();
    await booking.save();

    // Gửi email xác nhận
    // Lấy email người dùng
    const user = await User.findOne({ userId });
    if (user?.email) {
    const subject = 'Xác nhận thanh toán đặt sân';
    const html = `
        <h3>Xin chào,</h3>
        <p>Đơn đặt sân <strong>${booking.bookingId}</strong> của bạn đã được xác nhận thanh toán thành công.</p>
        <p>Thời gian: <strong>${booking.startTime.toLocaleString()}</strong> đến <strong>${booking.endTime.toLocaleString()}</strong></p>
        <p>Tổng tiền: <strong>${booking.totalPrice.toLocaleString()} VND</strong></p>
        <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
    `;

    await emailService.sendEmail(user.email, subject, html);
    }

    // Nếu có mã khuyến mãi đã áp dụng, đánh dấu isUsable = false
    const promoUse = await CustomerPromotion.findOne({
      userId,
      promotionId: booking.promotionId,
      isUsable: true
    });

    if (promoUse) {
      promoUse.isUsable = false;
      await promoUse.save();
    }

    res.json({ message: 'Booking confirmed and payment recorded' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
