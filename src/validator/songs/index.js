/* eslint-disable linebreak-style */

const { PayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const Validator = {
  validate: (payload) => {
    if (PayloadSchema.validate(payload).error) {
      throw new InvariantError('Invalid payload');
    }
  },
};

module.exports = Validator;
