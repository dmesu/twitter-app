const router = require('express').Router();

// middlewares
const {
  makeExpressCallback,
  makeValidatorCallback,
} = require('../../middlewares');

// controller
const controller = require('./user.controller');

// validator
const UserValidator = require('./user.validator');

// services
const UserService = require('./user.service');

// inject dependencies in controller methods
const getUsers = controller.getUsers({ UserService });
const postUser = controller.postUser({ UserService });

const UserController = {
  getUsers,
  postUser,
};

// routes
const routes = require('./user.routes')({
  router,
  UserValidator,
  UserController,
  makeExpressCallback,
  makeValidatorCallback,
});

module.exports = {
  UserService,
  UserRoutes: routes,
};
