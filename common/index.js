const jwt = require('jsonwebtoken');

const errors = require('./errors');

const generateToken = (data, expiresIn, app) => jwt.sign(data, app.get('secretKey'), { expiresIn });

module.exports = {
  ...errors,
  generateToken,
};
