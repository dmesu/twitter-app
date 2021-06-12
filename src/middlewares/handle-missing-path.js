var createError = require('http-errors')

module.exports = (req, res) => {
  console.log(req.baseUrl)
  throw new createError(404, `${req.method} ${req.baseUrl} not found!`);
}
