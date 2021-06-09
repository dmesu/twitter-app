const getUsers = ({ User }) => async () => {
  return await User.find();
};

const getUser = ({ User }) => async (username) => {
  return await User.find({ username: username });
};

const createUser = ({ User }) => async (user) => {
  return await new User(user).save();
};

const follow = ({ Follower }) => async (follower) => {
  return await new Follower(follower).save();
};

const getFollowers = ({ Follower }) => async (username) => {
  return await Follower.find(username);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  follow,
  getFollowers
};
