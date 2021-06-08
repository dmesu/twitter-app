const User = require('./model/user');

const doGetUsers = async () => {
  const res = await User.find()
  return res;
};

const doPostUser = async (user) => {
  let newUser = new User(user);
  const res = await newUser.save();
  return res;
};
module.exports = {
  doGetUsers,
  doPostUser,
};
