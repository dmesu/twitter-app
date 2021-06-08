
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

module.exports = {
  createTweet,
};
