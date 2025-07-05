const transporter = require('../config/mailer');

exports.sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Sports Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', to);
  } catch (err) {
    console.error('Email sending failed:', err);
  }
};