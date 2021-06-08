const Tweet = require('./model/tweet');

const createTweet = async (SocialService, tweet) => {
  const user = await SocialService.getUser(tweet.username)
  if (!user.length) {
    const createdUser = await SocialService.createUser({ username: tweet.username })
    console.log("User successfully created!", createdUser);
  }
  return await new Tweet(tweet).save();
};

module.exports = {
  createTweet,
};
