const Room = require('../models/Room');
const User = require('../models/User');

// @desc    Create a new room (Admin only)
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
  try {
    const { roomNumber, wing, capacity } = req.body;

    // Check if room already exists
    const existingRoom = await Room.findOne({ roomNumber, wing });
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: 'Room already exists with this number and wing'
      });
    }

    const room = await Room.create({
      roomNumber,
      wing,
      capacity,
      status: 'available'
    });

    res.status(201).json({
      success: true,
      data: room,
      message: 'Room created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all rooms with occupancy info
// @route   GET /api/rooms
// @access  Public
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate('occupants', 'name email rollNumber phone')
      .sort({ wing: 1, roomNumber: 1 });

    const roomsWithOccupancy = rooms.map(room => ({
      ...room.toObject(),
      currentOccupancy: room.occupants.length,
      availableSpots: room.capacity - room.occupants.length
    }));

    res.status(200).json({
      success: true,
      data: roomsWithOccupancy,
      message: 'Rooms retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get room by ID
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('occupants', 'name email rollNumber phone');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    const roomWithOccupancy = {
      ...room.toObject(),
      currentOccupancy: room.occupants.length,
      availableSpots: room.capacity - room.occupants.length
    };

    res.status(200).json({
      success: true,
      data: roomWithOccupancy,
      message: 'Room retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update room status (Admin only)
// @route   PUT /api/rooms/:id/status
// @access  Private/Admin
const updateRoomStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const roomId = req.params.id;

    const validStatuses = ['available', 'pending', 'allocated', 'maintenance'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: available, pending, allocated, maintenance'
      });
    }

    const room = await Room.findByIdAndUpdate(
      roomId,
      { status },
      { new: true, runValidators: true }
    ).populate('occupants', 'name email rollNumber phone');

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    const roomWithOccupancy = {
      ...room.toObject(),
      currentOccupancy: room.occupants.length,
      availableSpots: room.capacity - room.occupants.length
    };

    res.status(200).json({
      success: true,
      data: roomWithOccupancy,
      message: 'Room status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Manually assign a student to a room (Admin only)
// @route   PUT /api/rooms/:id/assign
// @access  Private/Admin
const assignOccupant = async (req, res) => {
  try {
    const { studentId } = req.body;
    const roomId = req.params.id;

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }

    // Check if student exists and is a student
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Check if room has available capacity
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Room is at full capacity'
      });
    }

    // Check if student is already assigned to a room
    const existingRoom = await Room.findOne({ occupants: studentId });
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: 'Student is already assigned to a room'
      });
    }

    // Add student to room
    room.occupants.push(studentId);
    room.status = 'allocated';
    await room.save();

    const updatedRoom = await Room.findById(roomId)
      .populate('occupants', 'name email rollNumber phone');

    const roomWithOccupancy = {
      ...updatedRoom.toObject(),
      currentOccupancy: updatedRoom.occupants.length,
      availableSpots: updatedRoom.capacity - updatedRoom.occupants.length
    };

    res.status(200).json({
      success: true,
      data: roomWithOccupancy,
      message: 'Student assigned to room successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove occupant from room (Admin only)
// @route   PUT /api/rooms/:id/remove-occupant
// @access  Private/Admin
const removeOccupant = async (req, res) => {
  try {
    const { studentId } = req.body;
    const roomId = req.params.id;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ 
        success: false, 
        message: 'Room not found' 
      });
    }

    room.occupants = room.occupants.filter(
      occId => occId.toString() !== studentId
    );

    // If room is now empty, mark as available
    if (room.occupants.length < room.capacity) {
      room.status = 'available';
    }

    await room.save();

    const updatedRoom = await Room.findById(roomId)
      .populate('occupants', 'name email rollNumber phone');

    const roomWithOccupancy = {
      ...updatedRoom.toObject(),
      currentOccupancy: updatedRoom.occupants.length,
      availableSpots: updatedRoom.capacity - updatedRoom.occupants.length
    };

    res.status(200).json({
      success: true,
      data: roomWithOccupancy,
      message: 'Student removed from room successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomStatus,
  assignOccupant,
  removeOccupant
};
