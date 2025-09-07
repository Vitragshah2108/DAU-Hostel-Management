const express = require('express');
const corsMiddleware = require('./middleware/cors.middleware');
const { generalLimiter } = require('./middleware/rate-limit.middleware');
const { notFound, errorHandler } = require('./middleware/error.middleware');

const app = express();

// Global middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));
app.use('/api', generalLimiter);

// Routes
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/rooms', require('./routes/room.route'));
app.use('/api/room-requests', require('./routes/room-request.route'));
app.use('/api/fees', require('./routes/fee.route'));
app.use('/api/complaints', require('./routes/complaint.route'));
app.use('/api/visitor-passes', require('./routes/visitor-pass.route'));
app.use('/api/events', require('./routes/hostel-event.route'));
app.use('/api/lost-found', require('./routes/lost-found.route'));
app.use('/api/notifications', require('./routes/notification.route'));

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
