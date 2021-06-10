module.exports = ({
  router,
  SocialController,
  SocialValidator,
  handleRequest,
  handleValidator,
}) => {
  router.get(
    '/users',
    handleRequest(SocialController.getUsers),
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
  return router;
};
