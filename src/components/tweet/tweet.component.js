const router = require('express').Router();

// middlewares
const {
  handleRequest,
  handleValidator,
} = require('../../middlewares');

// controller
const controller = require('./tweet.controller');

// validator
const TweetValidator = require('./tweet.validator');

// services
const TweetService = require('./tweet.service');
const SocialService = require('../social/social.service');

// inject dependencies in controller methods
const createTweet = controller.createTweet({ TweetService, SocialService });
const getTimeline = controller.getTimeline({ TweetService });
const getWall = controller.getWall({ TweetService, SocialService });

const TweetController = {
  createTweet,
  getTimeline,
  getWall
};

// routes
const routes = require('./tweet.routes')({
  router,
  TweetValidator,
  TweetController,
  handleRequest,
  handleValidator,
});

module.exports = {
  TweetService,
  TweetRoutes: routes,
};
