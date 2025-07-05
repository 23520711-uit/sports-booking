const express = require('express');
const router = express.Router();
const customer = require('../controllers/customer.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Áp dụng cho Customer
router.use(authenticateToken, authorizeRole(['Customer']));

// Thông tin cá nhân
router.get('/profile', customer.getProfile);
router.put('/profile', customer.updateProfile);

// Lịch đặt sân
router.get('/bookings', customer.getMyBookings);

// Giao dịch đã thanh toán
router.get('/transactions', customer.getMyTransactions);

module.exports = router;
