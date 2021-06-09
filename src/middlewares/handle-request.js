module.exports = (controller) => async (req, res) => {
  const httpResponse = await controller(req);
  return res.status(httpResponse.statusCode).send(httpResponse.body);
};
