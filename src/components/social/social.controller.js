const getUsers = ({
  SocialService,
}) => async (httpRequest) => {
  const response = await SocialService.doGetUsers();
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched users successfully!',
      data: response,
    },
  };
};

const postUser = ({
  SocialService,
}) => async (httpRequest) => {
  const response = await SocialService.doPostUser(httpRequest.body);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Created user successfully`,
      data: response,
    },
  };
};

module.exports = {
  getUsers,
  postUser,
};
