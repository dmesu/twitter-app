const getUsers = ({
  UserService,
}) => async (httpRequest) => {
  const response = await UserService.doGetUsers();
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
  UserService,
}) => async (httpRequest) => {
  const response = await UserService.doPostUser(httpRequest.body);
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
