const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { upload } = require('../middleware/upload.middleware');
const { createComplaint, getMyComplaints, getAllComplaints, updateComplaintStatus, addAdminNoteToComplaint } = require('../controllers/complaint.controller');

const createSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid('electrical', 'plumbing', 'geyser', 'other').required(),
  photo: Joi.string().uri().optional(), // if client pre-uploads or uses base64; otherwise omit
});
const statusSchema = Joi.object({ status: Joi.string().valid('pending', 'in_progress', 'resolved').required() });
const noteSchema = Joi.object({ note: Joi.string().required() });

router.post('/', protect, authorize('student'), upload.single('photo'), validate(createSchema), createComplaint);
router.get('/my-complaints', protect, authorize('student'), getMyComplaints);
router.get('/', protect, authorize('admin'), getAllComplaints);
router.put('/:id/status', protect, authorize('admin'), validate(statusSchema), updateComplaintStatus);
router.put('/:id/note', protect, authorize('admin'), validate(noteSchema), addAdminNoteToComplaint);

module.exports = router;
