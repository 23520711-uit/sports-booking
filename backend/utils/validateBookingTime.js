module.exports = function validateBookingTime(start, end) {
  const now = new Date();
  if (start <= now) {
    return { valid: false, message: 'Start time must be in the future' };
  }

  const open = 7 * 60 + 30;
  const close = 21 * 60 + 30;
  const getMinutes = d => d.getHours() * 60 + d.getMinutes();

  const startMin = getMinutes(start);
  const endMin = getMinutes(end);

  if (startMin < open || endMin > close) {
    return { valid: false, message: 'Time must be between 07:30 and 21:30' };
  }

  const duration = (end - start) / 60000;
  if (duration % 30 !== 0) {
    return { valid: false, message: 'Duration must be in 30-minute blocks' };
  }

  if (duration > 240) {
    return { valid: false, message: 'Booking duration cannot exceed 4 hours' };
  }

  return { valid: true };
};
