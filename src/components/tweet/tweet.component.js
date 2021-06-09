const { SocialService } = require('../social/social.component');

const Tweet = require('./model/tweet');
const ts = require('./tweet.service');
const TweetService = {
  createTweet: ts.createTweet({ Tweet, SocialService }),
  getTimeline: ts.getTimeline({ Tweet } ),
  getWall: ts.getWall({ Tweet, SocialService })
};

const tc = require('./tweet.controller');
const TweetController = {
  createTweet: tc.createTweet({ TweetService }),
  getTimeline: tc.getTimeline({ TweetService }),
  getWall: tc.getWall({ TweetService, SocialService })
};

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
