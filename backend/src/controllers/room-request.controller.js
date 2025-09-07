const RoomRequest = require('../models/RoomRequest');
const Room = require('../models/Room');
const User = require('../models/User');

// @desc    Student requests a room
// @route   POST /api/room-requests
// @access  Private/Student
const requestRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const studentId = req.user.userId;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check if student already has a pending or approved request
    const existingRequest = await RoomRequest.findOne({
      student: studentId,
      status: { $in: ['pending', 'approved'] }
    });
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending or approved room request'
      });
    }

    // Check if student is already assigned to a room
    const assignedRoom = await Room.findOne({ occupants: studentId });
    if (assignedRoom) {
      return res.status(400).json({
        success: false,
        message: 'You are already assigned to a room'
      });
    }

    // Count current requests for this room
    const requestCount = await RoomRequest.countDocuments({
      room: roomId,
      status: 'pending'
    });

    // If room has 3 pending requests, lock it
    if (requestCount >= 3) {
      await Room.findByIdAndUpdate(roomId, { status: 'pending' });
      return res.status(400).json({
        success: false,
        message: 'This room has reached maximum request limit and is now locked'
      });
    }

    // Create room request
    const roomRequest = await RoomRequest.create({
      student: studentId,
      room: roomId,
      status: 'pending'
    });

    const populatedRequest = await RoomRequest.findById(roomRequest._id)
      .populate('student', 'name email rollNumber')
      .populate('room', 'roomNumber wing capacity');

    res.status(201).json({
      success: true,
      data: populatedRequest,
      message: 'Room request submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's room requests
// @route   GET /api/room-requests/my-requests
// @access  Private/Student
const getMyRoomRequests = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const requests = await RoomRequest.find({ student: studentId })
      .populate('room', 'roomNumber wing capacity status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
      message: 'Room requests retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all room requests (Admin only)
// @route   GET /api/room-requests
// @access  Private/Admin
const getAllRoomRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const requests = await RoomRequest.find(filter)
      .populate('student', 'name email rollNumber phone')
      .populate('room', 'roomNumber wing capacity status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests,
      message: 'Room requests retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve a student's room request (Admin only)
// @route   PUT /api/room-requests/:id/approve
// @access  Private/Admin
const approveRoomRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    // Safer approval flow - prevent double allocation
    const roomRequest = await RoomRequest.findOneAndUpdate(
      { _id: requestId, status: 'pending' },
      { status: 'approved' },
      { new: true }
    )
    .populate('student', 'name email rollNumber')
    .populate('room', 'roomNumber wing capacity occupants');

    if (!roomRequest) {
      return res.status(400).json({
        success: false,
        message: 'Room request not found or not pending'
      });
    }

    // Now safely push occupant if capacity allows
    if (roomRequest.room.occupants.length >= roomRequest.room.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Room is at full capacity'
      });
    }

    await Room.findByIdAndUpdate(
      roomRequest.room._id,
      {
        $push: { occupants: roomRequest.student._id },
        $set: { status: 'allocated' }
      }
    );

    // Reject other pending requests
    await RoomRequest.updateMany(
      { room: roomRequest.room._id, status: 'pending', _id: { $ne: requestId } },
      { status: 'rejected' }
    );

    const updatedRequest = await RoomRequest.findById(requestId)
      .populate('student', 'name email rollNumber')
      .populate('room', 'roomNumber wing capacity status');

    res.status(200).json({
      success: true,
      data: updatedRequest,
      message: 'Room request approved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject a student's room request (Admin only)
// @route   PUT /api/room-requests/:id/reject
// @access  Private/Admin
const rejectRoomRequest = async (req, res) => {
  try {
    const requestId = req.params.id;

    const roomRequest = await RoomRequest.findById(requestId)
      .populate('student', 'name email rollNumber')
      .populate('room', 'roomNumber wing capacity');

    if (!roomRequest) {
      return res.status(404).json({
        success: false,
        message: 'Room request not found'
      });
    }

    if (roomRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Room request is not pending'
      });
    }

    // Update request status
    roomRequest.status = 'rejected';
    await roomRequest.save();

    // Check if room should be reopened (less than 3 pending requests)
    const pendingCount = await RoomRequest.countDocuments({
      room: roomRequest.room._id,
      status: 'pending'
    });

    if (pendingCount < 3) {
      await Room.findByIdAndUpdate(roomRequest.room._id, { status: 'available' });
    }

    const updatedRequest = await RoomRequest.findById(requestId)
      .populate('student', 'name email rollNumber')
      .populate('room', 'roomNumber wing capacity status');

    res.status(200).json({
      success: true,
      data: updatedRequest,
      message: 'Room request rejected successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  requestRoom,
  getMyRoomRequests,
  getAllRoomRequests,
  approveRoomRequest,
  rejectRoomRequest
};
