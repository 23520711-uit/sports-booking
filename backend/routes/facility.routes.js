const express = require('express');
const router = express.Router();
const facility = require('../controllers/facility.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ Admin mới được thao tác với cơ sở
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/', facility.getAllFacilities);
router.post('/', facility.createFacility);
router.put('/:facilityId', facility.updateFacility);
router.delete('/:facilityId', facility.deleteFacility);

module.exports = router;
