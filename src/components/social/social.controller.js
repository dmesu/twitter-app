const SocialService = require('./social.service');

const getUsers = async () => {
  const response = await SocialService.getUsers();
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched users successfully!',
      data: response,
    },
  };
};

const createUser = async (httpRequest) => {
  const response = await SocialService.createUser(httpRequest.body);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Created user successfully`,
      data: response,
    },
  };
};

const follow = async (httpRequest) => {
  const response = await SocialService.follow(httpRequest.body);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Created new follow`,
      data: response,
    },
  };
};

const likeTweet = async (httpRequest) => {
  const response = await SocialService.likeTweet(httpRequest.body);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Liked a tweet`,
      data: response,
    },
  };
};

const getLikes = async (httpRequest) => {
  const response = await SocialService.getLikes(httpRequest.params.usernameId);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched likes successfully!',
      data: response,
    },
  };
};

module.exports = {
  getUsers,
  createUser,
  follow,
  likeTweet,
  getLikes
};
