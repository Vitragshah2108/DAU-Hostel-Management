const VisitorPass = require('../models/VisitorPass');
const User = require('../models/User');

// @desc    Create visitor pass request (Student only)
// @route   POST /api/visitor-passes
// @access  Private/Student
const createVisitorPassRequest = async (req, res) => {
  try {
    const { visitorName, visitorPhone, visitDate, purpose } = req.body;
    const studentId = req.user.userId;

    // Validate visit date (should be in the future)
    const visitDateTime = new Date(visitDate);
    const now = new Date();
    if (visitDateTime <= now) {
      return res.status(400).json({
        success: false,
        message: 'Visit date must be in the future'
      });
    }

    const visitorPass = await VisitorPass.create({
      visitorName,
      visitorPhone,
      visitDate: visitDateTime,
      purpose,
      student: studentId,
      status: 'pending'
    });

    const populatedVisitorPass = await VisitorPass.findById(visitorPass._id)
      .populate('student', 'name email rollNumber');

    res.status(201).json({
      success: true,
      data: populatedVisitorPass,
      message: 'Visitor pass request submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's visitor passes
// @route   GET /api/visitor-passes/my-passes
// @access  Private/Student
const getMyVisitorPasses = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const visitorPasses = await VisitorPass.find({ student: studentId })
      .populate('student', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: visitorPasses,
      message: 'Visitor passes retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all visitor pass requests (Admin only)
// @route   GET /api/visitor-passes
// @access  Private/Admin
const getAllVisitorPassRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const visitorPasses = await VisitorPass.find(filter)
      .populate('student', 'name email rollNumber phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: visitorPasses,
      message: 'Visitor pass requests retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve visitor pass (Admin only)
// @route   PUT /api/visitor-passes/:id/approve
// @access  Private/Admin
const approveVisitorPass = async (req, res) => {
  try {
    const visitorPassId = req.params.id;

    const visitorPass = await VisitorPass.findById(visitorPassId)
      .populate('student', 'name email rollNumber');

    if (!visitorPass) {
      return res.status(404).json({
        success: false,
        message: 'Visitor pass request not found'
      });
    }

    if (visitorPass.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Visitor pass request is not pending'
      });
    }

    // Update status to approved
    visitorPass.status = 'approved';
    visitorPass.approvedAt = new Date();
    visitorPass.approvedBy = req.user.userId;

    // Generate QR code using a service function
    try {
      const { generateQRCode } = require('../services/qr.service');
      visitorPass.qrCode = await generateQRCode(visitorPass._id.toString());
    } catch (error) {
      // If QR service is not available, continue without QR code
      console.warn('QR code generation failed:', error.message);
    }

    await visitorPass.save();

    const updatedVisitorPass = await VisitorPass.findById(visitorPassId)
      .populate('student', 'name email rollNumber')
      .populate('approvedBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedVisitorPass,
      message: 'Visitor pass approved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reject visitor pass (Admin only)
// @route   PUT /api/visitor-passes/:id/reject
// @access  Private/Admin
const rejectVisitorPass = async (req, res) => {
  try {
    const { reason } = req.body;
    const visitorPassId = req.params.id;

    const visitorPass = await VisitorPass.findById(visitorPassId)
      .populate('student', 'name email rollNumber');

    if (!visitorPass) {
      return res.status(404).json({
        success: false,
        message: 'Visitor pass request not found'
      });
    }

    if (visitorPass.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Visitor pass request is not pending'
      });
    }

    // Update status to rejected
    visitorPass.status = 'rejected';
    visitorPass.rejectedAt = new Date();
    visitorPass.rejectedBy = req.user.userId;
    visitorPass.rejectionReason = reason || 'No reason provided';

    await visitorPass.save();

    const updatedVisitorPass = await VisitorPass.findById(visitorPassId)
      .populate('student', 'name email rollNumber')
      .populate('rejectedBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedVisitorPass,
      message: 'Visitor pass rejected successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createVisitorPassRequest,
  getMyVisitorPasses,
  getAllVisitorPassRequests,
  approveVisitorPass,
  rejectVisitorPass
};
