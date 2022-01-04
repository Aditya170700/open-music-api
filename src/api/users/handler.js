/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

const ClientError = require('../../exceptions/ClientError');
const { response } = require('../../utils/response');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);
      const { username, password, fullname } = request.payload;

      const userId = await this._service.add({ username, password, fullname });

      return response(h, 'success', 201, 'User created successfully', { userId });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async getUserByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const user = await this._service.getById(id);

      return response(h, 'success', 200, 'User found successfully', { user });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async getUsersByUsernameHandler(request, h) {
    try {
      const { username = '' } = request.query;
      const users = await this._service.getUsersByUsername(username);
      return response(h, 'success', 200, 'Users found successfully', { users });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }
}

module.exports = UsersHandler;
