const MessFeedback = require('../models/MessFeedback');
const User = require('../models/User');

// @desc    Submit meal feedback (Student)
// @route   POST /api/mess-feedback
// @access  Private/Student
const submitMealFeedback = async (req, res) => {
  try {
    const { date, mealType, rating, comments } = req.body;
    const studentId = req.user.userId;

    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    // Check if feedback already exists for this date and meal type
    const existingFeedback = await MessFeedback.findOne({
      student: studentId,
      date: new Date(date),
      mealType
    });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: 'Feedback already submitted for this meal'
      });
    }

    const feedback = await MessFeedback.create({
      student: studentId,
      date: new Date(date),
      mealType,
      rating,
      comments
    });

    const populatedFeedback = await MessFeedback.findById(feedback._id)
      .populate('student', 'name email rollNumber');

    res.status(201).json({
      success: true,
      data: populatedFeedback,
      message: 'Meal feedback submitted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's meal feedback
// @route   GET /api/mess-feedback/my-feedback
// @access  Private/Student
const getMyMealFeedback = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { date, mealType } = req.query;
    const filter = { student: studentId };

    if (date) filter.date = new Date(date);
    if (mealType) filter.mealType = mealType;

    const feedback = await MessFeedback.find(filter)
      .populate('student', 'name email rollNumber')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: feedback,
      message: 'Meal feedback retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get meal feedback summary (Admin only)
// @route   GET /api/mess-feedback/summary
// @access  Private/Admin
const getMealFeedbackSummary = async (req, res) => {
  try {
    const { date, startDate, endDate, mealType } = req.query;
    let filter = {};

    // Date filtering
    if (date) {
      filter.date = new Date(date);
    } else if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (mealType) filter.mealType = mealType;

    const feedback = await MessFeedback.find(filter)
      .populate('student', 'name email rollNumber');

    // Calculate summary statistics
    const summary = {
      totalResponses: feedback.length,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      comments: [],
      mealTypeBreakdown: {}
    };

    if (feedback.length > 0) {
      // Calculate average rating
      const totalRating = feedback.reduce((sum, item) => sum + item.rating, 0);
      summary.averageRating = (totalRating / feedback.length).toFixed(2);

      // Rating distribution
      feedback.forEach(item => {
        summary.ratingDistribution[item.rating]++;
      });

      // Collect comments
      summary.comments = feedback
        .filter(item => item.comments && item.comments.trim() !== '')
        .map(item => ({
          comment: item.comments,
          rating: item.rating,
          date: item.date,
          mealType: item.mealType,
          student: {
            name: item.student.name,
            rollNumber: item.student.rollNumber
          }
        }));

      // Meal type breakdown
      const mealTypes = [...new Set(feedback.map(item => item.mealType))];
      mealTypes.forEach(type => {
        const typeFeedback = feedback.filter(item => item.mealType === type);
        const typeRating = typeFeedback.reduce((sum, item) => sum + item.rating, 0);
        summary.mealTypeBreakdown[type] = {
          count: typeFeedback.length,
          averageRating: (typeRating / typeFeedback.length).toFixed(2)
        };
      });
    }

    res.status(200).json({
      success: true,
      data: {
        summary,
        rawFeedback: feedback
      },
      message: 'Meal feedback summary retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  submitMealFeedback,
  getMyMealFeedback,
  getMealFeedbackSummary
};
