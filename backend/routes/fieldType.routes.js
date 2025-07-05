const express = require('express');
const router = express.Router();
const fieldType = require('../controllers/fieldType.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ Admin có quyền thao tác
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/', fieldType.getAllFieldTypes);
router.post('/', fieldType.createFieldType);
router.put('/:fieldTypeId', fieldType.updateFieldType);
router.delete('/:fieldTypeId', fieldType.deleteFieldType);

module.exports = router;
