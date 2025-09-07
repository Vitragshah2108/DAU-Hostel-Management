const Fee = require('../models/Fee');
const User = require('../models/User');

// @desc    Create a fee record for a student (Admin only)
// @route   POST /api/fees
// @access  Private/Admin
const createFeeRecord = async (req, res) => {
  try {
    const { studentId, amount, dueDate, description } = req.body;

    // Check if student exists
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const fee = await Fee.create({
      student: studentId,
      amount,
      dueDate: new Date(dueDate),
      description,
      status: 'unpaid'
    });

    const populatedFee = await Fee.findById(fee._id)
      .populate('student', 'name email rollNumber');

    res.status(201).json({
      success: true,
      data: populatedFee,
      message: 'Fee record created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's fees
// @route   GET /api/fees/my-fees
// @access  Private/Student
const getMyFees = async (req, res) => {
  try {
    const studentId = req.user.userId;

    const fees = await Fee.find({ student: studentId })
      .populate('student', 'name email rollNumber')
      .sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      data: fees,
      message: 'Fees retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Pay a fee (Student)
// @route   PUT /api/fees/:id/pay
// @access  Private/Student
const payFee = async (req, res) => {
  try {
    const feeId = req.params.id;
    const studentId = req.user.userId;

    const fee = await Fee.findOne({ _id: feeId, student: studentId });
    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    if (fee.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Fee has already been paid'
      });
    }

    // Simulate payment and update status
    fee.status = 'paid';
    fee.paidAt = new Date();
    fee.paymentMethod = 'online'; // Default payment method
    await fee.save();

    const updatedFee = await Fee.findById(feeId)
      .populate('student', 'name email rollNumber');

    res.status(200).json({
      success: true,
      data: updatedFee,
      message: 'Fee payment successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all fees with filters (Admin only)
// @route   GET /api/fees
// @access  Private/Admin
const getAllFees = async (req, res) => {
  try {
    const { status, studentId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (studentId) filter.student = studentId;

    const fees = await Fee.find(filter)
      .populate('student', 'name email rollNumber phone')
      .sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      data: fees,
      message: 'Fees retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createFeeRecord,
  getMyFees,
  payFee,
  getAllFees
};
