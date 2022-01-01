/* eslint-disable linebreak-style */
/* eslint-disable camelcase */

const findAllMapper = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

const findByIdMapper = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

module.exports = { findAllMapper, findByIdMapper };
