/* eslint-disable linebreak-style */

const { PayloadSchema } = require('./schema');

const Validator = {
  validate: (payload) => {
    if (PayloadSchema.validate(payload).error) {
      throw new Error('Invalid payload');
    }
  },
};

module.exports = Validator;
