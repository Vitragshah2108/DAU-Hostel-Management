const cors = require('cors');

const corsMiddleware = cors({
  origin: (origin, cb) => {
    const list = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
    // allow server-to-server / local tools with no Origin
    if (!origin || list.length === 0 || list.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

module.exports = corsMiddleware;
