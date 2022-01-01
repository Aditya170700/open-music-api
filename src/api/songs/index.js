/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { songService, SongValidator }) => {
    server.route(routes(new Handler(songService, SongValidator)));
  },
};
