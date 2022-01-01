/* eslint-disable linebreak-style */

const Joi = require('joi');

const PayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = {
  PayloadSchema,
};
