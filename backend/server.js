const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const app = require('./app');
const { scheduleBookingReminders } = require('./services/schedule.service');

const PORT = process.env.PORT || 5000;

// Kết nối DB và khởi động server
connectDB().then(() => {
  scheduleBookingReminders();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB:', err);
  process.exit(1);
});
