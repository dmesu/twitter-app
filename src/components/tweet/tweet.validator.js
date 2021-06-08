const Joi = require('../../support/validator');

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

module.exports = {
  validateTweet,
};
