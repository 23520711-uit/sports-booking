const express = require('express');
const router = express.Router();
const booking = require('../controllers/booking.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Áp dụng middleware cho Customer
router.use(authenticateToken, authorizeRole(['Customer']));

// Lấy danh sách loại sân, cơ sở, dịch vụ, khuyến mãi
router.get('/field-types', booking.getFieldTypes);
router.get('/facilities', booking.getFacilities);
router.get('/service-types', booking.getServiceTypes);
router.get('/services', booking.getServices);
router.get('/my-promotions', booking.getMyPromotions);

// Tìm sân và khung giờ trống
router.get('/search', booking.searchAvailableFields);
router.get('/available-start-times', booking.getAvailableStartTimes);
router.get('/valid-durations', booking.getValidDurations);

// Tạo booking mới & xác nhận thanh toán
router.post('/', booking.createBooking);
router.post('/confirm/:bookingId', booking.confirmBooking);

module.exports = router;
