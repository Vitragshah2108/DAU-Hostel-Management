require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const corsMiddleware = require('./src/middleware/cors.middleware');
const { generalLimiter } = require('./src/middleware/rate-limit.middleware');
const { notFound, errorHandler } = require('./src/middleware/error.middleware');

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api', generalLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Dau Hostel Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', require('./src/routes/auth.route'));
app.use('/api/users', require('./src/routes/user.route'));
app.use('/api/admin', require('./src/routes/admin.route'));
app.use('/api/rooms', require('./src/routes/room.route'));
app.use('/api/room-requests', require('./src/routes/room-request.route'));
app.use('/api/fees', require('./src/routes/fee.route'));
app.use('/api/complaints', require('./src/routes/complaint.route'));
app.use('/api/visitor-passes', require('./src/routes/visitor-pass.route'));
app.use('/api/hostel-events', require('./src/routes/hostel-event.route'));
app.use('/api/lost-found', require('./src/routes/lost-found.route'));
app.use('/api/notifications', require('./src/routes/notification.route'));

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => {
    console.log('🔌 Server closed due to unhandled rejection');
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`❌ Uncaught Exception: ${err.message}`);
  server.close(() => {
    console.log('🔌 Server closed due to uncaught exception');
    process.exit(1);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('🔌 Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('🔌 Server closed');
    process.exit(0);
  });
});
