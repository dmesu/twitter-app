const socialComponent = require('./components/social/social.component');
const tweetComponent = require('./components/tweet/tweet.component');

function routes(router) {
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

module.exports = routes;
