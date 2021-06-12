const Joi = require('@hapi/joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateTweet = (httpRequest) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    message: Joi.string().required()
  });
  return schema.validate(httpRequest.body, options);
};

const validateTimeline = (httpRequest) => {
  const schema = Joi.object({
    username: Joi.string().required()
  });
  return schema.validate(httpRequest.params, options);
};

const validateWall = (httpRequest) => {
  const schema = Joi.object({
    username: Joi.string().required()
  });
  return schema.validate(httpRequest.params, options);
};

module.exports = {
  validateTweet,
  validateTimeline,
  validateWall
};
