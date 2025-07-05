const mongoose = require('mongoose');

const fieldTypeSchema = new mongoose.Schema({
  fieldTypeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  size: { type: String, required: true },
  surface: { type: String, required: true }
});

module.exports = mongoose.model('FieldType', fieldTypeSchema);
