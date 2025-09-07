/**
 * Send an in-app or push notification (placeholder)
 * @param {Object} options
 * @param {string} options.userId
 * @param {string} options.title
 * @param {string} options.message
 * @returns {Promise<void>}
 */
const sendNotification = async ({ userId, title, message }) => {
  // In real implementation: DB insert or push service call
  console.log(`Notification → [${userId}] ${title}: ${message}`);
};

module.exports = { sendNotification };
