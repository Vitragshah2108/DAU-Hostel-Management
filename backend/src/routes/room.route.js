const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { createRoom, getAllRooms, getRoomById, updateRoomStatus, assignOccupant, removeOccupant } = require('../controllers/room.controller');

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', protect, authorize('admin'), createRoom);
router.put('/:id/status', protect, authorize('admin'), updateRoomStatus);
router.put('/:id/assign', protect, authorize('admin'), assignOccupant);
if (removeOccupant) router.put('/:id/remove', protect, authorize('admin'), removeOccupant);

module.exports = router;
