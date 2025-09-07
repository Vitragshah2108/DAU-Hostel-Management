const Joi = require('joi');

const createComplaintSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid('electrical', 'plumbing', 'geyser', 'other').default('other'),
  photo: Joi.string().uri().optional(),
});

const updateComplaintStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'in_progress', 'resolved').required(),
});

const addAdminNoteSchema = Joi.object({
  note: Joi.string().required(),
});

module.exports = { createComplaintSchema, updateComplaintStatusSchema, addAdminNoteSchema };
