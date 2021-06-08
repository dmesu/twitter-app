module.exports = ({
  router,
  UserController,
  UserValidator,
  makeExpressCallback,
  makeValidatorCallback,
}) => {
  router.get(
    '/',
    makeExpressCallback(UserController.getUsers),
  );

  router.post(
    '/',
    makeValidatorCallback(UserValidator.validateUser),
    makeExpressCallback(UserController.postUser),
  );
  return router;
};
