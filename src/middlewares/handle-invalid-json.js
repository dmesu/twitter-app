var createError = require('http-errors')

module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    console.log("Invalid json syntax", err);
    throw new createError(400, err.message);
  }
  return next();
};
