const { BadRequestError } = require('../utils/client-errors');

module.exports = (validator) => (req, res, next) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
  };
  const { error } = validator(httpRequest);
  if (error) throw new BadRequestError(error.message);
  return next();
};
