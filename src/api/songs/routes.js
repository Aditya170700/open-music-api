/* eslint-disable linebreak-style */

const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.saveHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.findAllHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.findByIdHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.updateByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteByIdHandler,
  },
];

module.exports = routes;
