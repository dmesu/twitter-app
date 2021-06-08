const router = require('express').Router();

// middlewares
const {
  makeExpressCallback,
  makeValidatorCallback,
} = require('../../middlewares');

// controller
const controller = require('./social.controller');

// validator
const SocialValidator = require('./social.validator');

// services
const SocialService = require('./social.service');

// inject dependencies in controller methods
const getUsers = controller.getUsers({ SocialService });
const postUser = controller.postUser({ SocialService });

const SocialController = {
  getUsers,
  postUser,
};

// routes
const routes = require('./social.routes')({
  router,
  SocialValidator,
  SocialController,
  makeExpressCallback,
  makeValidatorCallback,
});

module.exports = {
  SocialService,
  SocialRoutes: routes,
};
