const generateId = (prefix) => {
  const timestamp = Date.now(); // milliseconds since epoch
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 chữ số ngẫu nhiên
  return `${prefix}_${timestamp}${random}`;
};

module.exports = generateId;
