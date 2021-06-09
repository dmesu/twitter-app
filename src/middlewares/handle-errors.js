const { ClientError } = require('../utils/client-errors');

module.exports = async (err, req, res, next) => {
  const errorData = {
    date: new Date().toISOString(),
    env: process.env.NODE_ENV,
    level: 'error',
    name: err.name,
    message: err.message,
    api: req.url,
    method: req.method,
    stack: err.stack,
    body: req.body,
    client: req.ip,
  };
  
  console.log(err);

  if (err instanceof ClientError) {
    return res
      .status(err.status)
      .send({
        success: false,
        message: err.message,
      });
  }

  return res.status(500).send({
    success: false,
    message: 'Something went wrong!',
  });
};
