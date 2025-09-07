const notFound = (req, res, next) => {
  return res.status(404).json({ success: false, message: `Not Found: ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(status).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

module.exports = { notFound, errorHandler };
