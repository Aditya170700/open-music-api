/* eslint-disable linebreak-style */
/* eslint-disable no-console */
require('dotenv').config();
const Hapi = require('@hapi/hapi');

// Albums resource
const albums = require('./api/albums');
const AlbumService = require('./services/postgres/AlbumService');
const AlbumValidator = require('./validator/albums');

// Songs resource
const songs = require('./api/songs');
const SongService = require('./services/postgres/SongService');
const SongValidator = require('./validator/songs');

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        albumService,
        AlbumValidator,
      },
    },
    {
      plugin: songs,
      options: {
        songService,
        SongValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
