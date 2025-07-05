const express = require('express');
const router = express.Router();
const promotion = require('../controllers/promotion.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { authorizeRole } = require('../middlewares/role.middleware');

// Chỉ Admin được thao tác
router.use(authenticateToken, authorizeRole(['Admin']));

router.get('/', promotion.getAllPromotions);
router.post('/', promotion.createPromotion);
router.put('/:promotionId', promotion.updatePromotion);
router.delete('/:promotionId', promotion.deletePromotion);

module.exports = router;
