const Notification = require('../models/Notification');
const User = require('../models/User');

// @desc    Create a notification (Admin only)
// @route   POST /api/notifications
// @access  Private/Admin
const createNotification = async (req, res) => {
  try {
    const { title, message, target } = req.body; // target: 'all' or specific studentId

    if (target === 'all') {
      // Send notification to all students
      const students = await User.find({ role: 'student' });
      
      const notifications = await Promise.all(
        students.map(student => 
          Notification.create({
            title,
            message,
            recipient: student._id,
            type: 'general',
            status: 'unread'
          })
        )
      );

      res.status(201).json({
        success: true,
        data: { count: notifications.length },
        message: `Notification sent to ${notifications.length} students`
      });
    } else {
      // Send notification to specific student
      const student = await User.findById(target);
      if (!student || student.role !== 'student') {
        return res.status(404).json({
          success: false,
          message: 'Student not found'
        });
      }

      const notification = await Notification.create({
        title,
        message,
        recipient: target,
        type: 'personal',
        status: 'unread'
      });

      const populatedNotification = await Notification.findById(notification._id)
        .populate('recipient', 'name email rollNumber');

      res.status(201).json({
        success: true,
        data: populatedNotification,
        message: 'Notification sent successfully'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student's notifications
// @route   GET /api/notifications/my-notifications
// @access  Private/Student
const getMyNotifications = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const { status } = req.query;
    const filter = { recipient: studentId };

    if (status) filter.status = status;

    const notifications = await Notification.find(filter)
      .populate('recipient', 'name email rollNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notifications,
      message: 'Notifications retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark notification as read (Student)
// @route   PUT /api/notifications/:id/read
// @access  Private/Student
const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const studentId = req.user.userId;

    const notification = await Notification.findOne({
      _id: notificationId,
      recipient: studentId
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    if (notification.status === 'read') {
      return res.status(400).json({
        success: false,
        message: 'Notification is already marked as read'
      });
    }

    notification.status = 'read';
    notification.readAt = new Date();
    await notification.save();

    const updatedNotification = await Notification.findById(notificationId)
      .populate('recipient', 'name email rollNumber');

    res.status(200).json({
      success: true,
      data: updatedNotification,
      message: 'Notification marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createNotification,
  getMyNotifications,
  markNotificationAsRead
};
