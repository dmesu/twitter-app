const { BadRequestError } = require('../utils/client-errors');

module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    throw new BadRequestError(err.message);
  }
  return next();
};
