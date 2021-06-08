const User = require('./model/user');
const Follower = require('./model/follower');

const getUsers = async () => {
  return await User.find();
};

const createUser = async (user) => {
  return await new User(user).save();
};

const follow = async (follower) => {
  return await new Follower(follower).save();
};

module.exports = {
  getUsers,
  createUser,
  follow
};
