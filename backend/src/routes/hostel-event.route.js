const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { createEvent, getAllEvents, registerForEvent, getMyEventRegistrations, getEventRegistrations } = require('../controllers/event.controller');

const createSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  date: Joi.date().iso().required(),
  capacity: Joi.number().min(1).required(),
});

router.get('/', getAllEvents); // public
router.post('/', protect, authorize('admin'), validate(createSchema), createEvent);
router.post('/:id/register', protect, authorize('student'), registerForEvent);
router.get('/my-events', protect, authorize('student'), getMyEventRegistrations);
router.get('/:id/registrations', protect, authorize('admin'), getEventRegistrations);

module.exports = router;
