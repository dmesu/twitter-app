module.exports = ({
  router,
  SocialController,
  SocialValidator,
  makeExpressCallback,
  makeValidatorCallback,
}) => {
  router.get(
    '/',
    makeExpressCallback(SocialController.getUsers),
  );

  router.post(
    '/',
    makeValidatorCallback(SocialValidator.validateUser),
    makeExpressCallback(SocialController.postUser),
  );
  return router;
};
