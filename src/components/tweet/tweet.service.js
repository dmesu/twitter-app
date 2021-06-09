const Tweet = require('./model/tweet');

const createTweet = async (SocialService, tweet) => {
  const user = await SocialService.getUser(tweet.username)
  if (!user.length) {
    const createdUser = await SocialService.createUser({ username: tweet.username })
    console.log("User successfully created!", createdUser);
  }
  return await new Tweet(tweet).save();
};

const getTimeline = async (username) => {
  return await Tweet.find(username)
};

const getWall = async (SocialService, username) => {
  const followers = await SocialService.getFollowers(username)
  const followees = followers.map(follower => {
    return follower.followee
  })
  return await Tweet.find({ username: { $in: followees } });
};

module.exports = {
  createTweet,
  getTimeline,
  getWall
};
