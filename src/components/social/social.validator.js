const Joi = require('../../support/validator');

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

module.exports = {
  validateUser,
  validateFollow
};
