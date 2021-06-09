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
    handleRequest(SocialController.follow),
  );
  return router;
};
