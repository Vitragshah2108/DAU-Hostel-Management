const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { validate, Joi } = require('../middleware/validate.middleware');
const { requestRoom, getMyRoomRequests, getAllRoomRequests, approveRoomRequest, rejectRoomRequest } = require('../controllers/room-request.controller');

const requestSchema = Joi.object({ roomId: Joi.string().required() });

router.post('/', protect, authorize('student'), validate(requestSchema), requestRoom);
router.get('/my-requests', protect, authorize('student'), getMyRoomRequests);
router.get('/', protect, authorize('admin'), getAllRoomRequests);
router.put('/:id/approve', protect, authorize('admin'), approveRoomRequest);
router.put('/:id/reject', protect, authorize('admin'), rejectRoomRequest);

module.exports = router;
