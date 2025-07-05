const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateId = require('../utils/generateId');
const { sendEmail } = require('../services/email.service');
require('dotenv').config();

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateId('ND');

    await User.create({ userId, email, password: hashedPassword, role: 'Customer' });
    await Customer.create({ userId, fullName, phone });

    res.status(201).json({ message: 'Register success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Quên mật khẩu (gửi mã OTP về email - giả lập)
const otps = new Map(); // key: email, value: { otp, expiredAt }

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiredAt = Date.now() + 5 * 60 * 1000; // 5 phút

    otps.set(email, { otp, expiredAt });
    
    await sendEmail(
    email,
    'Mã OTP đặt lại mật khẩu',
    `<p>Xin chào,</p>
    <p>Mã OTP của bạn là: <b>${otp}</b></p>
    <p>Mã có hiệu lực trong 5 phút.</p>`
    );

    res.json({ message: 'Đã gửi OTP đến email của bạn' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xác nhận OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otps.get(email);
    if (!record || record.otp != otp || Date.now() > record.expiredAt) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    res.json({ message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đặt lại mật khẩu
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashed });
    otps.delete(email);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Đổi mật khẩu (khi đang đăng nhập)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ userId: req.user.userId });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return res.status(400).json({ message: 'Incorrect current password' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ userId: user.userId }, { password: hashed });
    res.json({ message: 'Password changed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
