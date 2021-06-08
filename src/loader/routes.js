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
    '/social',
    socialComponent.SocialRoutes,
  );
  router.use(
    '/tweet',
    tweetComponent.TweetRoutes,
  );
  return router;
}

module.exports = loadRoutes;
