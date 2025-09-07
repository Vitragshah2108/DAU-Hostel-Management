const Event = require('../models/Event');
const User = require('../models/User');

// @desc    Create a hostel event (Admin only)
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const { title, description, date, capacity, location } = req.body;

    const event = await Event.create({
      title,
      description,
      date: new Date(date),
      capacity,
      location,
      status: 'active'
    });

    res.status(201).json({
      success: true,
      data: event,
      message: 'Event created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all hostel events
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const events = await Event.find(filter)
      .populate('registrations', 'name email rollNumber')
      .sort({ date: 1 });

    const eventsWithRegistrationInfo = events.map(event => ({
      ...event.toObject(),
      currentRegistrations: event.registrations.length,
      availableSpots: event.capacity - event.registrations.length
    }));

    res.status(200).json({
      success: true,
      data: eventsWithRegistrationInfo,
      message: 'Events retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Register for an event (Student)
// @route   POST /api/events/:id/register
// @access  Private/Student
const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const studentId = req.user.userId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    if (event.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Event is not active for registration'
      });
    }

    // Check if student is already registered
    if (event.registrations.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this event'
      });
    }

    // Check capacity
    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({
        success: false,
        message: 'Event is at full capacity'
      });
    }

    // Add student to registrations
    event.registrations.push(studentId);
    await event.save();

    const updatedEvent = await Event.findById(eventId)
      .populate('registrations', 'name email rollNumber');

    const eventWithRegistrationInfo = {
      ...updatedEvent.toObject(),
      currentRegistrations: updatedEvent.registrations.length,
      availableSpots: updatedEvent.capacity - updatedEvent.registrations.length
    };

    res.status(200).json({
      success: true,
      data: eventWithRegistrationInfo,
      message: 'Successfully registered for event'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's event registrations
// @route   GET /api/events/my-registrations
// @access  Private/Student
const getMyEventRegistrations = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const events = await Event.find({ registrations: studentId })
      .populate('registrations', 'name email rollNumber')
      .sort({ date: 1 });

    const eventsWithRegistrationInfo = events.map(event => ({
      ...event.toObject(),
      currentRegistrations: event.registrations.length,
      availableSpots: event.capacity - event.registrations.length
    }));

    res.status(200).json({
      success: true,
      data: eventsWithRegistrationInfo,
      message: 'Event registrations retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all students registered for a specific event (Admin only)
// @route   GET /api/events/:id/registrations
// @access  Private/Admin
const getEventRegistrations = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId)
      .populate('registrations', 'name email rollNumber phone');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const eventWithRegistrationInfo = {
      ...event.toObject(),
      currentRegistrations: event.registrations.length,
      availableSpots: event.capacity - event.registrations.length
    };

    res.status(200).json({
      success: true,
      data: eventWithRegistrationInfo,
      message: 'Event registrations retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  registerForEvent,
  getMyEventRegistrations,
  getEventRegistrations
};
