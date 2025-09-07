const Joi = require('joi');

// schema: a Joi schema; property: 'body' | 'query' | 'params'
const validate = (schema, property = 'body') => (req, res, next) => {
  const options = { abortEarly: false, stripUnknown: true, convert: true };
  const { error, value } = schema.validate(req[property], options);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(d => d.message),
    });
  }
  req[property] = value;
  return next();
};

// Export Joi so routes can build small inline schemas when needed
module.exports = { validate, Joi };
