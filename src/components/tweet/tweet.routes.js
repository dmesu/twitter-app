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
