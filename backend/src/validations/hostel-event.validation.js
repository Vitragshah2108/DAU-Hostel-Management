const Joi = require('joi');

const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  date: Joi.date().greater('now').required(),
  capacity: Joi.number().min(1).required(),
});

const registerEventSchema = Joi.object({
  eventId: Joi.string().required(),
});

module.exports = { createEventSchema, registerEventSchema };
