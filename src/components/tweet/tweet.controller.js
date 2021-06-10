const TweetService = require('./tweet.service');

const createTweet = async (httpRequest) => {
  const response = await TweetService.createTweet(httpRequest.body);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Created tweet successfully`,
      data: response,
    },
  };
};

const getTimeline = async (httpRequest) => {
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

const getWall = async (httpRequest) => {
  const response = await TweetService.getWall(httpRequest.params);
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
