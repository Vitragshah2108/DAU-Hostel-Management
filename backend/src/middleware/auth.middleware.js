const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized: no token' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Keep it lightweight; controllers can query DB when needed
    req.user = { userId: decoded.userId, role: decoded.role };
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized: invalid or expired token' });
  }
};

module.exports = { protect };
