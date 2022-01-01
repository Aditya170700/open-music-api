/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */

const ClientError = require('../../exceptions/ClientError');
const { response } = require('../../utils/response');

class Handler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.saveHandler = this.saveHandler.bind(this);
    this.findAllHandler = this.findAllHandler.bind(this);
    this.findByIdHandler = this.findByIdHandler.bind(this);
    this.updateByIdHandler = this.updateByIdHandler.bind(this);
    this.deleteByIdHandler = this.deleteByIdHandler.bind(this);
  }

  async saveHandler(request, h) {
    try {
      this._validator.validate(request.payload);
      const { title, year, genre, performer, duration, albumId } = request.payload;
      const id = await this._service.save({ title, year, genre, performer, duration, albumId });
      return response(h, 'success', 201, 'Song saved successfully', { songId: id });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async findAllHandler(request, h) {
    try {
      const data = await this._service.findAll();
      return response(h, 'success', 200, 'Songs found successfully', { songs: data });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async findByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const data = await this._service.findById(id);
      return response(h, 'success', 200, 'Song found successfully', { song: data });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async updateByIdHandler(request, h) {
    try {
      this._validator.validate(request.payload);
      const { id } = request.params;
      const result = await this._service.updateById(id, request.payload);
      return response(h, 'success', 200, 'Song updated successfully', { result });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async deleteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const result = await this._service.deleteById(id);
      return response(h, 'success', 200, 'Song deleted successfully', { result });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }
}

module.exports = Handler;
