const Tweet = require('./tweet.model');

const doGetTweets = async () => {
  const res = await Tweet.find()
  return res;
};

const doPostTweet = async (tweet) => {
  let newTweet = new Tweet(tweet);
  const res = await newTweet.save();
  return res;
};
module.exports = {
  doGetTweets,
  doPostTweet,
};
