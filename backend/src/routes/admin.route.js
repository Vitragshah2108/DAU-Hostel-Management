const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { getDashboardStats, getAnalytics } = require('../controllers/admin.controller');

router.use(protect, authorize('admin'));
router.get('/dashboard-stats', getDashboardStats);
router.get('/analytics', getAnalytics);

module.exports = router;
