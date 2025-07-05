const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const initAdmin = async () => {
  const adminEmail = 'admin@example.com';

  const existingAdmin = await User.findOne({ role: 'Admin' });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      userId: 'AD001',
      email: adminEmail,
      password: hashedPassword,
      role: 'Admin'
    });
    console.log('Admin account created:', adminEmail);
  } else {
    console.log('Admin account already exists');
  }
};

module.exports = initAdmin;
