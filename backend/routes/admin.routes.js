const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ cho Admin
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/customers', admin.getAllCustomers);
router.get('/customers/:customerId/bookings', admin.getCustomerBookings);
router.get('/customers/:customerId/transactions', admin.getCustomerTransactions);

module.exports = router;
