// load components
const countryComponent = require('../components/country/country.component');
const userComponent = require('../components/user/user.component');
const tweetComponent = require('../components/tweet/tweet.component');

function loadRoutes(router) {
  router.use(
    '/countries',
    countryComponent.CountryRoutes,
  );
  router.use(
    '/users',
    userComponent.UserRoutes,
  );
  router.use(
    '/tweets',
    tweetComponent.TweetRoutes,
  );
  return router;
}

module.exports = loadRoutes;
