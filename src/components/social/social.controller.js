const getUsers = ({ SocialService }) => async () => {
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

const createUser = ({ SocialService }) => async (httpRequest) => {
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

const follow = ({ SocialService }) => async (httpRequest) => {
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

module.exports = {
  getUsers,
  createUser,
  follow
};
