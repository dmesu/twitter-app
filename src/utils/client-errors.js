/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */
class ClientError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

const clientErrors = Object.entries({
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  Conflict: {
    statusCode: 409,
    message: 'Conflict',
  }
}).reduce((map, [name, data]) => {
  map[`${name}Error`] = class extends ClientError {
    constructor() {
      super(data.statusCode, data.message);
    }
  };
  return map;
}, {});

module.exports = {
  ...clientErrors,
  ClientError,
};
