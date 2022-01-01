/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

const Handler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { albumService, AlbumValidator }) => {
    server.route(routes(new Handler(albumService, AlbumValidator)));
  },
};
