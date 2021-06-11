const User = require('./model/user');
const Follower = require('./model/follower');
const Like = require('./model/like');

const getUsers = async () => {
  return await User.find();
};

const getUser = async (username) => {
  return await User.find({ username: username });
};

const createUser = async (user) => {
  return await new User(user).save();
};

const follow = async (follower) => {
  return await new Follower(follower).save();
};

const getFollowers = async (username) => {
  return await Follower.find(username);
};

const likeTweet = async (like) => {
  return await Like.save(like);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  follow,
  getFollowers,
  likeTweet
};
