const errorHandler = require('./error-handler');
const badJsonHandler = require('./bad-json-handler');
const notFoundHandler = require('./404-handler');
const handleRequest = require('./express-callback');
const handleValidator = require('./validator-callback');

module.exports = {
  errorHandler,
  badJsonHandler,
  notFoundHandler,
  handleRequest,
  handleValidator,
};
