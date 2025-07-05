const ServiceType = require('../models/serviceType.model');
const generateId = require('../utils/generateId');

// Lấy tất cả loại dịch vụ
exports.getAllServiceTypes = async (req, res) => {
  try {
    const types = await ServiceType.find();
    res.json(types);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm loại dịch vụ
exports.createServiceType = async (req, res) => {
  try {
    const { name } = req.body;
    const serviceTypeId = generateId('LDV');
    await ServiceType.create({ serviceTypeId, name });
    res.status(201).json({ message: 'Service type created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật loại dịch vụ
exports.updateServiceType = async (req, res) => {
  try {
    const { serviceTypeId } = req.params;
    const { name } = req.body;
    await ServiceType.updateOne({ serviceTypeId }, { name });
    res.json({ message: 'Service type updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa loại dịch vụ
exports.deleteServiceType = async (req, res) => {
  try {
    const { serviceTypeId } = req.params;
    await ServiceType.deleteOne({ serviceTypeId });
    res.json({ message: 'Service type deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
