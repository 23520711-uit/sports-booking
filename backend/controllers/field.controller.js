const Field = require('../models/field.model');
const generateId = require('../utils/generateId');

// Lấy tất cả sân
exports.getAllFields = async (req, res) => {
  try {
    const fields = await Field.find();
    res.json(fields);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm sân
exports.createField = async (req, res) => {
  try {
    const { name, fieldTypeId, facilityId, pricePerHour } = req.body;
    const fieldId = generateId('SAN');
    await Field.create({
      fieldId,
      name,
      fieldTypeId,
      facilityId,
      pricePerHour,
      status: 'Available'
    });
    res.status(201).json({ message: 'Field created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật sân
exports.updateField = async (req, res) => {
  try {
    const { fieldId } = req.params;
    const { name, fieldTypeId, facilityId, pricePerHour, status } = req.body;
    await Field.updateOne(
      { fieldId },
      { name, fieldTypeId, facilityId, pricePerHour, status }
    );
    res.json({ message: 'Field updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa sân
exports.deleteField = async (req, res) => {
  try {
    const { fieldId } = req.params;
    await Field.deleteOne({ fieldId });
    res.json({ message: 'Field deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
