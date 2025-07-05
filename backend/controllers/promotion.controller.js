const Promotion = require('../models/promotion.model');
const Customer = require('../models/customer.model');
const CustomerPromotion = require('../models/customerPromotion.model');
const generateId = require('../utils/generateId');

// 1. Lấy tất cả khuyến mãi
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Thêm khuyến mãi
exports.createPromotion = async (req, res) => {
  try {
    const { code, discountPercent, fieldTypeId, startDate, endDate } = req.body;
    const promotionId = generateId('KM');

    await Promotion.create({
      promotionId,
      code,
      discountPercent,
      fieldTypeId,
      startDate,
      endDate,
    });

    const allCustomers = await Customer.find();

    const promotionList = allCustomers.map(customer => ({
      userId: customer.userId,
      promotionId,
      isUsable: true,
    }));

    await CustomerPromotion.insertMany(promotionList);

    res.status(201).json({ message: 'Promotion created and assigned to all customers' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Cập nhật khuyến mãi
exports.updatePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;
    const { code, discountPercent, fieldTypeId, startDate, endDate } = req.body;

    await Promotion.updateOne(
      { promotionId },
      { code, discountPercent, fieldTypeId, startDate, endDate }
    );

    res.json({ message: 'Promotion updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Xóa khuyến mãi
exports.deletePromotion = async (req, res) => {
  try {
    const { promotionId } = req.params;

    // Xóa khuyến mãi
    await Promotion.deleteOne({ promotionId });

    // Xóa các bản ghi liên quan đến khách hàng
    await CustomerPromotion.deleteMany({ promotionId });

    res.json({ message: 'Promotion and related records deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
