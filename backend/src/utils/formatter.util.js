const dayjs = require('dayjs');

/**
 * Format date to human-readable string
 * @param {Date|string} date
 * @returns {string}
 */
const formatDate = (date) => {
  return dayjs(date).format('DD MMM YYYY, hh:mm A');
};

/**
 * Mask phone number (e.g., 98765XXXX)
 * @param {string} phone
 * @returns {string}
 */
const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/\d(?=\d{4})/g, 'X');
};

module.exports = { formatDate, maskPhone };
