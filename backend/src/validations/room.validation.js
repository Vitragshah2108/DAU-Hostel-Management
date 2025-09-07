const Joi = require('joi');

const createRoomSchema = Joi.object({
  roomNumber: Joi.string().required(),
  wing: Joi.string().required(),
  capacity: Joi.number().min(1).default(3),
});

const requestRoomSchema = Joi.object({
  roomId: Joi.string().required(),
});

module.exports = { createRoomSchema, requestRoomSchema };
