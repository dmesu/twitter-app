const router = require('express').Router();

// middlewares
const {
  handleRequest,
  handleValidator,
} = require('../../middlewares');

// controller
const controller = require('./social.controller');

// validator
const SocialValidator = require('./social.validator');

// services
const SocialService = require('./social.service');

// inject dependencies in controller methods
const getUsers = controller.getUsers({ SocialService });
const createUser = controller.createUser({ SocialService });
const follow = controller.follow({ SocialService });

const SocialController = {
  getUsers,
  createUser,
  follow
};

// routes
const routes = require('./social.routes')({
  router,
  SocialValidator,
  SocialController,
  handleRequest,
  handleValidator,
});

module.exports = {
  SocialService,
  SocialRoutes: routes,
};
