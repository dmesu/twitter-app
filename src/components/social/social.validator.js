const Joi = require('@hapi/joi');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateUser = (httpRequest) => {
  const schema = Joi.object({
    username: Joi.string().required()
  });
  return schema.validate(httpRequest.body, options);
};

const validateFollow = (httpRequest) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    followee: Joi.string().required()
  });
  return schema.validate(httpRequest.body, options);
};

const validateLike = (httpRequest) => {
  const schema = Joi.object({
    usernameId: Joi.string().required(),
    tweetId: Joi.string().required()
  });
  return schema.validate(httpRequest.body, options);
};

module.exports = {
  validateUser,
  validateFollow,
  validateLike
};
