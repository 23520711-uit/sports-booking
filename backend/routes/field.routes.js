const express = require('express');
const router = express.Router();
const field = require('../controllers/field.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ Admin được thao tác với sân
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/', field.getAllFields);
router.post('/', field.createField);
router.put('/:fieldId', field.updateField);
router.delete('/:fieldId', field.deleteField);

module.exports = router;
