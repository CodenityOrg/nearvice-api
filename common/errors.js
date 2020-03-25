module.exports = {
  unauthorized: () => {
    const unauthorized = new Error();
    unauthorized.status = 403;
    unauthorized.message = 'Forbidden';

    return unauthorized;
  },

  notfound: (entity) => {
    const error = new Error();
    error.status = 404;
    error.message = `${entity} not found.`;
    return error;
  },

  unprocessable: () => {
    const error = new Error();
    error.status = 422;
    error.message = 'Unprocessable Entity';
    return error;
  },

  badRequest: () => {
    const error = new Error();
    error.status = 400;
    error.message = 'Bad Request';
    return error;
  },

  internalError: () => {
    const error = new Error();
    error.status = 500;
    error.message = 'Internal Server Error';
    return error;
  },

  serviceUnavailable: (name = '') => {
    const error = new Error();
    error.status = 503;
    error.message = `${name} Service Unavailable`;
    return error;
  },

  unsupportedMediaType: () => {
    const error = new Error();
    error.status = 415;
    error.message = 'Unsupported Media Type';
    return error;
  },
};
