const SocialRoutes = require('./components/social/social.routes');
const TweetRoutes = require('./components/tweet/tweet.routes');

function routes(router) {
  router.use(
    '/social',
    SocialRoutes(),
  );
  router.use(
    '/tweet',
    TweetRoutes(),
  );
  return router;
}

module.exports = routes;
