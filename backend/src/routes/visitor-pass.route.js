const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { createVisitorPassRequest, getMyVisitorPasses, getAllVisitorPassRequests, approveVisitorPass, rejectVisitorPass } = require('../controllers/visitor-pass.controller');

const createSchema = Joi.object({
  visitorName: Joi.string().required(),
  visitorPhone: Joi.string().required(),
  visitDate: Joi.date().iso().required(),
  purpose: Joi.string().allow('').optional(),
});
const rejectSchema = Joi.object({ reason: Joi.string().allow('').optional() });

router.post('/', protect, authorize('student'), validate(createSchema), createVisitorPassRequest);
router.get('/my-passes', protect, authorize('student'), getMyVisitorPasses);
router.get('/', protect, authorize('admin'), getAllVisitorPassRequests);
router.put('/:id/approve', protect, authorize('admin'), approveVisitorPass);
router.put('/:id/reject', protect, authorize('admin'), validate(rejectSchema), rejectVisitorPass);

module.exports = router;
