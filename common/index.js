const jwt = require('jsonwebtoken');

const errors = require('./errors');

const buildError = (res, error) => {
  const errorData = {
    statusCode: 500,
    status: 'error',
    message: '',
  };
  if (error && error.name === 'ValidationError') {
    errorData.statusCode = 400;
    // eslint-disable-next-line no-restricted-syntax
    for (const field in error.errors) {
      if (error.errors[field]) {
        errorData.message += `${error.errors[field].message} `;
      }
    }
  } else {
    errorData.message = 'An error occurred trying to process your request';
    console.log(error);
  }

  return res.status(errorData.statusCode).json({
    status: errorData.status,
    message: errorData.message.trim(),
  });
};

const generateToken = (data, expiresIn, app) => jwt.sign(data, app.get('secretKey'), { expiresIn });

module.exports = {
  errors,
  buildError,
  generateToken,
};
