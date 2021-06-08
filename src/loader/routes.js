// load components
const countryComponent = require('../components/country/country.component');
const socialComponent = require('../components/social/social.component');
const tweetComponent = require('../components/tweet/tweet.component');

function loadRoutes(router) {
  router.use(
    '/countries',
    countryComponent.CountryRoutes,
  );
  router.use(
    '/users',
    socialComponent.SocialRoutes,
  );
  router.use(
    '/tweets',
    tweetComponent.TweetRoutes,
  );
  return router;
}

module.exports = loadRoutes;
