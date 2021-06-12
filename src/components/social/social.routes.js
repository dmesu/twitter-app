const SocialController = require('./social.controller');
const router = require('express').Router();
const { handleRequest, handleValidator } = require('../../middlewares');
const SocialValidator = require('./social.validator');

module.exports = () => {
  router.get(
    '/users',
    handleRequest(SocialController.getUsers),
  );
  router.get(
    '/likes/:usernameId',
    handleRequest(SocialController.getLikes),
  );
  router.post(
    '/users',
    handleValidator(SocialValidator.validateUser),
    handleRequest(SocialController.createUser),
  );
  router.post(
    '/follow',
    handleValidator(SocialValidator.validateFollow),
    handleRequest(SocialController.follow),
  );
  router.post(
    '/like',
    handleValidator(SocialValidator.validateLike),
    handleRequest(SocialController.likeTweet),
  );
  return router;
};
