const getTweets = ({
  TweetService,
}) => async (httpRequest) => {
  const response = await TweetService.doGetTweets();
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched users successfully!',
      data: response,
    },
  };
};

const postTweet = ({
  TweetService,
}) => async (httpRequest) => {
  const response = await TweetService.doPostTweet(httpRequest.body);
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
  getTweets,
  postTweet,
};
