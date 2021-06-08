module.exports = ({
  router,
  TweetController,
  TweetValidator,
  makeExpressCallback,
  makeValidatorCallback,
}) => {
  router.post(
    '/tweet',
    makeValidatorCallback(TweetValidator.validateTweet),
    makeExpressCallback(TweetController.postTweet),
  );

  return router;
};
