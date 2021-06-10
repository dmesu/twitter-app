const TweetController = require('./tweet.controller');
const router = require('express').Router();
const { handleRequest, handleValidator } = require('../../middlewares');
const TweetValidator = require('./tweet.validator');
const routes = require('./tweet.routes')({
  router,
  TweetValidator,
  TweetController,
  handleRequest,
  handleValidator,
});

module.exports = {
  TweetRoutes: routes
};
