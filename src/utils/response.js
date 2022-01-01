/* eslint-disable linebreak-style */

function response(h, status = 'error', code = 500, message = 'Server Error', data = null) {
  return h.response({
    status,
    message,
    data,
  }).code(code);
}

module.exports = {
  response,
};
