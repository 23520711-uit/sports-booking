const Service = require('../models/service.model');
const generateId = require('../utils/generateId');

// Lấy tất cả dịch vụ
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm dịch vụ
exports.createService = async (req, res) => {
  try {
    const { name, serviceTypeId, price } = req.body;
    const serviceId = generateId('DV');
    await Service.create({ serviceId, name, serviceTypeId, price });
    res.status(201).json({ message: 'Service created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật dịch vụ
exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, serviceTypeId, price } = req.body;
    await Service.updateOne({ serviceId }, { name, serviceTypeId, price });
    res.json({ message: 'Service updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa dịch vụ
exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    await Service.deleteOne({ serviceId });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
