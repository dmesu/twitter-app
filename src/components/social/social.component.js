const User = require('./model/user');
const Follower = require('./model/follower');
const ss = require('./social.service');
const SocialService = {
  getUsers: ss.getUsers({ User }),
  getUser: ss.getUser({ User }),
  createUser: ss.createUser({ User }),
  follow: ss.follow({ Follower }),
  getFollowers: ss.getFollowers({ Follower }),
};

const sc = require('./social.controller');
const SocialController = {
  getUsers: sc.getUsers({ SocialService }),
  createUser: sc.createUser({ SocialService }),
  follow: sc.follow({ SocialService })
};

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
  SocialService: SocialService,
  SocialRoutes: routes
};
