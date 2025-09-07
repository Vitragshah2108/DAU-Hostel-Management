const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { createFeeRecord, getMyFees, payFee, getAllFees } = require('../controllers/fee.controller');

const createSchema = Joi.object({
  student: Joi.string().required(),
  amountDue: Joi.number().min(0).required(),
  dueDate: Joi.date().iso().required(),
});

router.post('/', protect, authorize('admin'), validate(createSchema), createFeeRecord);
router.get('/my-fees', protect, authorize('student'), getMyFees);
router.put('/:id/pay', protect, authorize('student'), payFee);
router.get('/', protect, authorize('admin'), getAllFees);

module.exports = router;
