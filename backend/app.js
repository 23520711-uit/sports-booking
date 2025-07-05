const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Middleware cơ bản
app.use(cors());
app.use(express.json());

// ===== Các route chính =====
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/customers', require('./routes/customer.routes'));
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/bookings', require('./routes/booking.routes'));
app.use('/api/services', require('./routes/service.routes'));
app.use('/api/service-types', require('./routes/serviceType.routes'));
app.use('/api/fields', require('./routes/field.routes'));
app.use('/api/field-types', require('./routes/fieldType.routes'));
app.use('/api/facilities', require('./routes/facility.routes'));
app.use('/api/promotions', require('./routes/promotion.routes'));

// Route kiểm tra
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Xử lý route không tồn tại (404)
app.use((req, res, next) => {
  res.status(404);
  next(new Error('Route not found'));
});

// Middleware xử lý lỗi chung
app.use(errorHandler);

module.exports = app;
