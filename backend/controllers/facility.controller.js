const Facility = require('../models/facility.model');
const generateId = require('../utils/generateId');

// Lấy danh sách cơ sở
exports.getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thêm cơ sở
exports.createFacility = async (req, res) => {
  try {
    const { name, address } = req.body;
    const facilityId = generateId('CS');
    await Facility.create({ facilityId, name, address });
    res.status(201).json({ message: 'Facility created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật cơ sở
exports.updateFacility = async (req, res) => {
  try {
    const { facilityId } = req.params;
    const { name, address } = req.body;
    await Facility.updateOne({ facilityId }, { name, address });
    res.json({ message: 'Facility updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa cơ sở
exports.deleteFacility = async (req, res) => {
  try {
    const { facilityId } = req.params;
    await Facility.deleteOne({ facilityId });
    res.json({ message: 'Facility deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
