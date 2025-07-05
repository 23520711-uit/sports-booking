const express = require('express');
const router = express.Router();
const service = require('../controllers/service.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ Admin được thao tác
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/', service.getAllServices);
router.post('/', service.createService);
router.put('/:serviceId', service.updateService);
router.delete('/:serviceId', service.deleteService);

module.exports = router;
