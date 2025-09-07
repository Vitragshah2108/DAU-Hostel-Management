const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { authLimiter } = require('../middleware/rate-limit.middleware');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student', 'admin').required(),
  phone: Joi.string().optional(),
  rollNumber: Joi.string().optional(),
});
const updateProfileSchema = Joi.object({
  name: Joi.string().optional(),
  phone: Joi.string().optional(),
  password: Joi.string().min(6).optional(),
});

router.post('/login', authLimiter, validate(loginSchema), loginUser);
router.post('/register', protect, authorize('admin'), validate(registerSchema), registerUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validate(updateProfileSchema), updateProfile);

module.exports = router;
