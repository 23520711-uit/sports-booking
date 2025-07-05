const express = require('express');
const router = express.Router();
const serviceType = require('../controllers/serviceType.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ Admin được thao tác
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/', serviceType.getAllServiceTypes);
router.post('/', serviceType.createServiceType);
router.put('/:serviceTypeId', serviceType.updateServiceType);
router.delete('/:serviceTypeId', serviceType.deleteServiceType);

module.exports = router;
