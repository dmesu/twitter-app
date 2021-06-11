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
  return await new Like(like).save();
};

const getLikes = async (usernameId) => {
  return await Like.find({ usernameId: usernameId });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  follow,
  getFollowers,
  likeTweet,
  getLikes
};
