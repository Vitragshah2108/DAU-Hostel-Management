const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { createNotification, getMyNotifications, markNotificationAsRead } = require('../controllers/notification.controller');

const createSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  target: Joi.alternatives().try(
    Joi.string().valid('all'),
    Joi.object({ studentId: Joi.string().required() })
  ).required()
});

router.post('/', protect, authorize('admin'), validate(createSchema), createNotification);
router.get('/my-notifications', protect, authorize('student'), getMyNotifications);
router.put('/:id/read', protect, authorize('student'), markNotificationAsRead);

module.exports = router;
