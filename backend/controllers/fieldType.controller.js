const FieldType = require('../models/fieldType.model');
const generateId = require('../utils/generateId');

// Lấy tất cả loại sân
exports.getAllFieldTypes = async (req, res) => {
  try {
    const types = await FieldType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm loại sân
exports.createFieldType = async (req, res) => {
  try {
    const { name, size, surface } = req.body;
    const fieldTypeId = generateId('LS');
    await FieldType.create({ fieldTypeId, name, size, surface });
    res.status(201).json({ message: 'Field type created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Sửa loại sân
exports.updateFieldType = async (req, res) => {
  try {
    const { fieldTypeId } = req.params;
    const { name, size, surface } = req.body;
    await FieldType.updateOne({ fieldTypeId }, { name, size, surface });
    res.json({ message: 'Field type updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa loại sân
exports.deleteFieldType = async (req, res) => {
  try {
    const { fieldTypeId } = req.params;
    await FieldType.deleteOne({ fieldTypeId });
    res.json({ message: 'Field type deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
