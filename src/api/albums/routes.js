/* eslint-disable linebreak-style */

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.saveHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.findByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.updateByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteByIdHandler,
  },
];

module.exports = routes;
