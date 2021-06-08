module.exports = ({
  router,
  CountryController,
  CountryValidator,
  handleRequest,
  handleValidator,
}) => {
  router.get(
    '/',
    handleRequest(CountryController.getCountries),
  );

  router.get(
    '/:countryName/population/:date',
    handleValidator(CountryValidator.validateCountryNameAndDate),
    handleRequest(CountryController.getCountryPopulationByDate),
  );
  return router;
};
