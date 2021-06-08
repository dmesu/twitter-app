module.exports = ({
  router,
  TweetController,
  TweetValidator,
  handleRequest,
  handleValidator,
}) => {
  router.post(
    '/',
    handleValidator(TweetValidator.validateTweet),
    handleRequest(TweetController.createTweet),
  );

  return router;
};
