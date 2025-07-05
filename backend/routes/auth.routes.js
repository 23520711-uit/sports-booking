const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

// Đăng ký
router.post('/register', auth.register);

// Đăng nhập
router.post('/login', auth.login);

// Quên mật khẩu
router.post('/forgot-password', auth.forgotPassword);

// Xác nhận OTP
router.post('/verify-otp', auth.verifyOtp);

// Đặt lại mật khẩu
router.post('/reset-password', auth.resetPassword);

// Đổi mật khẩu khi đã đăng nhập
router.post('/change-password', authenticateToken, auth.changePassword);

module.exports = router;
