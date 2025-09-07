const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
  }),
  role: Joi.string().valid('student', 'admin').default('student'),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  rollNumber: Joi.string().when('role', { is: 'student', then: Joi.required() }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };
