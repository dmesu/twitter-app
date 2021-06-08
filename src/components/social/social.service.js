const User = require('./model/user');
const Follower = require('./model/follower');

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

module.exports = {
  getUsers,
  getUser,
  createUser,
  follow
};
