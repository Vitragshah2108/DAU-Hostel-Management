const Complaint = require('../models/Complaint');
const User = require('../models/User');

// @desc    Create a complaint (Student only)
// @route   POST /api/complaints
// @access  Private/Student
const createComplaint = async (req, res) => {
  try {
    const { title, description, category, photo } = req.body;
    const studentId = req.user.userId;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      photo,
      student: studentId,
      status: 'pending'
    });

    const populatedComplaint = await Complaint.findById(complaint._id)
      .populate('student', 'name email rollNumber');

    res.status(201).json({
      success: true,
      data: populatedComplaint,
      message: 'Complaint submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's complaints
// @route   GET /api/complaints/my-complaints
// @access  Private/Student
const getMyComplaints = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const complaints = await Complaint.find({ student: studentId })
      .populate('student', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: complaints,
      message: 'Complaints retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all complaints with filters (Admin only)
// @route   GET /api/complaints
// @access  Private/Admin
const getAllComplaints = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const complaints = await Complaint.find(filter)
      .populate('student', 'name email rollNumber phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: complaints,
      message: 'Complaints retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update complaint status (Admin only)
// @route   PUT /api/complaints/:id/status
// @access  Private/Admin
const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const complaintId = req.params.id;

    const validStatuses = ['pending', 'in_progress', 'resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, in_progress, resolved'
      });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true, runValidators: true }
    ).populate('student', 'name email rollNumber phone');

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      data: complaint,
      message: 'Complaint status updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add admin note to complaint (Admin only)
// @route   PUT /api/complaints/:id/note
// @access  Private/Admin
const addAdminNoteToComplaint = async (req, res) => {
  try {
    const { note } = req.body;
    const complaintId = req.params.id;
    const adminId = req.user.userId;

    if (!note || note.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Note is required'
      });
    }

    // Make adding admin notes atomic to avoid race conditions
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        $push: {
          adminNotes: {
            note: note.trim(),
            addedBy: adminId,
            addedAt: new Date()
          }
        }
      },
      { new: true }
    )
    .populate('student', 'name email rollNumber phone')
    .populate('adminNotes.addedBy', 'name email');

    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedComplaint,
      message: 'Admin note added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  addAdminNoteToComplaint
};
