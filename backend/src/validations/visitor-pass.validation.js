const Joi = require('joi');

const createVisitorPassSchema = Joi.object({
  visitorName: Joi.string().required(),
  visitorPhone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  visitDate: Joi.date().greater('now').required(),
  purpose: Joi.string().optional(),
});

const updateVisitorPassStatusSchema = Joi.object({
  status: Joi.string().valid('approved', 'rejected').required(),
  reason: Joi.string().optional(),
});

module.exports = { createVisitorPassSchema, updateVisitorPassStatusSchema };
