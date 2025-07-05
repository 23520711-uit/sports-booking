const cron = require('node-cron');
const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const sendEmail = require('./email.service'); // bạn đã có rồi

// Gửi thông báo 1 giờ trước
const scheduleBookingReminders = () => {
  // Chạy mỗi phút
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    // Làm tròn đến phút để tránh lệch giây
    oneHourLater.setSeconds(0, 0);

    const bookings = await Booking.find({
      startTime: oneHourLater,
      status: 'Confirmed'
    });

    for (const booking of bookings) {
      const user = await User.findOne({ userId: booking.userId });
      if (!user?.email) continue;

      await sendEmail({
        to: user.email,
        subject: 'Nhắc nhở lịch đặt sân',
        html: `
          <p>Xin chào ${user.fullName || 'bạn'},</p>
          <p>Bạn có lịch đặt sân sẽ bắt đầu lúc <strong>${booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong> hôm nay.</p>
          <p>Vui lòng đến đúng giờ.</p>
        `
      });

      console.log(`Đã gửi nhắc nhở đến ${user.email}`);
    }
  });
};

module.exports = { scheduleBookingReminders };