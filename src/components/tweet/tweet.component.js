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

// inject dependencies in controller methods
const getTweets = controller.getTweets({ TweetService });
const postTweet = controller.postTweet({ TweetService });

const TweetController = {
  getTweets,
  postTweet,
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
