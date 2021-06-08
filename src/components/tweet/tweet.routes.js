module.exports = ({
  router,
  TweetController,
  TweetValidator,
  handleRequest,
  handleValidator,
}) => {
  router.post(
    '/tweet',
    handleValidator(TweetValidator.validateTweet),
    handleRequest(TweetController.postTweet),
  );

  return router;
};
