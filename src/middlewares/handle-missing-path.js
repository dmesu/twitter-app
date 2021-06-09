module.exports = (req, res) => res.status(404).send({
  success: false,
  message: `${req.method} ${req.url} not found!`,
});
