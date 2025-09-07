const QRCode = require('qrcode');

/**
 * Generate QR code data URL
 * @param {string} text
 * @returns {Promise<string>} data URL of QR code
 */
const generateQRCode = async (text) => {
  return await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' });
};

module.exports = { generateQRCode };
