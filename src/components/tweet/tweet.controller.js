
const createTweet = ({
  TweetService, SocialService
}) => async (httpRequest) => {
  const response = await TweetService.createTweet(SocialService, httpRequest.body);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Created tweet successfully`,
      data: response,
    },
  };
};

const getTimeline = ({
  TweetService
}) => async (httpRequest) => {
  const response = await TweetService.getTimeline(httpRequest.params);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Got timeline successfully`,
      data: response,
    },
  };
};

const getWall = ({
  TweetService, SocialService
}) => async (httpRequest) => {
  const response = await TweetService.getWall(SocialService, httpRequest.params);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Got wall successfully`,
      data: response,
    },
  };
};

module.exports = {
  createTweet,
  getTimeline,
  getWall
};
