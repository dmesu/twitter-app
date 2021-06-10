const SocialController = require('./social.controller');

const router = require('express').Router();
const { handleRequest, handleValidator } = require('../../middlewares');
const SocialValidator = require('./social.validator');
const routes = require('./social.routes')({
  router,
  SocialValidator,
  SocialController,
  handleRequest,
  handleValidator,
});

module.exports = {
  SocialRoutes: routes
};
