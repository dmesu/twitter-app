const TweetController = require('./tweet.controller');
const router = require('express').Router();
const { handleRequest, handleValidator } = require('../../middlewares');
const TweetValidator = require('./tweet.validator');

module.exports = () => {
  router.post(
    '/',
    handleValidator(TweetValidator.validateTweet),
    handleRequest(TweetController.createTweet),
  );

  router.get(
    '/timeline/:username',
    handleValidator(TweetValidator.validateTimeline),
    handleRequest(TweetController.getTimeline),
  );

  router.get(
    '/wall/:username',
    handleValidator(TweetValidator.validateWall),
    handleRequest(TweetController.getWall),
  );

  return router;
};
