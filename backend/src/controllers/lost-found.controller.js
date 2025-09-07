const LostFound = require('../models/LostFound');
const User = require('../models/User');

// @desc    Report a lost item (Student)
// @route   POST /api/lost-found/lost
// @access  Private/Student
const reportLostItem = async (req, res) => {
  try {
    const { title, description, photo, lastSeenLocation, lastSeenDate } = req.body;
    const studentId = req.user.userId;

    const lostItem = await LostFound.create({
      title,
      description,
      photo,
      lastSeenLocation,
      lastSeenDate: lastSeenDate ? new Date(lastSeenDate) : new Date(),
      type: 'lost',
      reportedBy: studentId,
      status: 'active'
    });

    const populatedItem = await LostFound.findById(lostItem._id)
      .populate('reportedBy', 'name email rollNumber');

    res.status(201).json({
      success: true,
      data: populatedItem,
      message: 'Lost item reported successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Report a found item (Student)
// @route   POST /api/lost-found/found
// @access  Private/Student
const reportFoundItem = async (req, res) => {
  try {
    const { title, description, photo, foundLocation, foundDate } = req.body;
    const studentId = req.user.userId;

    const foundItem = await LostFound.create({
      title,
      description,
      photo,
      foundLocation,
      foundDate: foundDate ? new Date(foundDate) : new Date(),
      type: 'found',
      reportedBy: studentId,
      status: 'active'
    });

    const populatedItem = await LostFound.findById(foundItem._id)
      .populate('reportedBy', 'name email rollNumber');

    res.status(201).json({
      success: true,
      data: populatedItem,
      message: 'Found item reported successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all lost and found items
// @route   GET /api/lost-found
// @access  Public
const getAllLostFoundItems = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (status) filter.status = status;

    const items = await LostFound.find(filter)
      .populate('reportedBy', 'name email rollNumber')
      .populate('claimedBy', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: items,
      message: 'Lost and found items retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Claim an item (Student)
// @route   PUT /api/lost-found/:id/claim
// @access  Private/Student
const claimItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const studentId = req.user.userId;
    const { claimDescription } = req.body;

    const item = await LostFound.findById(itemId);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (item.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Item is not available for claiming'
      });
    }

    if (item.claimedBy) {
      return res.status(400).json({
        success: false,
        message: 'Item has already been claimed'
      });
    }

    // Update item with claim information
    item.claimedBy = studentId;
    item.claimDescription = claimDescription;
    item.claimDate = new Date();
    item.status = 'pending_claim';
    await item.save();

    const updatedItem = await LostFound.findById(itemId)
      .populate('reportedBy', 'name email rollNumber')
      .populate('claimedBy', 'name email rollNumber');

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: 'Item claim submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve a claim (Admin only)
// @route   PUT /api/lost-found/:id/approve-claim
// @access  Private/Admin
const approveClaim = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { approved } = req.body; // true or false

    const item = await LostFound.findById(itemId)
      .populate('reportedBy', 'name email rollNumber')
      .populate('claimedBy', 'name email rollNumber');

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    if (item.status !== 'pending_claim') {
      return res.status(400).json({
        success: false,
        message: 'Item is not pending claim approval'
      });
    }

    if (approved) {
      item.status = 'returned';
      item.approvedAt = new Date();
      item.approvedBy = req.user.userId;
    } else {
      item.status = 'active';
      item.claimedBy = undefined;
      item.claimDescription = undefined;
      item.claimDate = undefined;
    }

    await item.save();

    const updatedItem = await LostFound.findById(itemId)
      .populate('reportedBy', 'name email rollNumber')
      .populate('claimedBy', 'name email rollNumber')
      .populate('approvedBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: approved ? 'Claim approved and item marked as returned' : 'Claim rejected and item made available again'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  reportLostItem,
  reportFoundItem,
  getAllLostFoundItems,
  claimItem,
  approveClaim
};
