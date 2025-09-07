const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { upload } = require('../middleware/upload.middleware');
const { reportLostItem, reportFoundItem, getAllLostFoundItems, claimItem, approveClaim } = require('../controllers/lost-found.controller');

const lostFoundSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  photo: Joi.string().uri().optional(),
});

router.get('/', getAllLostFoundItems); // public
router.post('/lost', protect, authorize('student'), upload.single('photo'), validate(lostFoundSchema), reportLostItem);
router.post('/found', protect, authorize('student'), upload.single('photo'), validate(lostFoundSchema), reportFoundItem);
router.put('/:id/claim', protect, authorize('student'), claimItem);
router.put('/:id/approve-claim', protect, authorize('admin'), approveClaim);

module.exports = router;
