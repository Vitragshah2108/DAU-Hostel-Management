const multer = require('multer');

const storage = multer.memoryStorage();
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB
const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

const fileFilter = (req, file, cb) => {
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error('Only image files are allowed (jpeg, png, webp)'));
};

const upload = multer({ storage, limits, fileFilter });

module.exports = { upload };
