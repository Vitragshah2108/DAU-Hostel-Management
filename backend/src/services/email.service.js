const nodemailer = require('nodemailer');

// configure from env
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @returns {Promise<void>}
 */
const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };
