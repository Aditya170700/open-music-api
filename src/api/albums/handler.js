/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */

class Handler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.saveHandler = this.saveHandler.bind(this);
    this.findByIdHandler = this.findByIdHandler.bind(this);
    this.updateByIdHandler = this.updateByIdHandler.bind(this);
    this.deleteByIdHandler = this.deleteByIdHandler.bind(this);
  }

  async saveHandler(request, h) {
    try {
      this._validator.validate(request.payload);
      const { name, year } = request.payload;
      const id = await this._service.save({ name, year });
      const response = h.response({
        status: 'success',
        data: {
          albumId: id,
        },
        message: 'Album saved successfully',
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }

  async findByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.findById(id);
      const response = h.response({
        status: 'success',
        data: {
          album,
        },
        message: 'Album found successfully',
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }

  async updateByIdHandler(request, h) {
    try {
      this._validator.validate(request.payload);
      const { id } = request.params;
      const result = await this._service.updateById(id, request.payload);
      const response = h.response({
        status: 'success',
        data: {
          result,
        },
        message: 'Album updated successfully',
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }

  async deleteByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const result = await this._service.deleteById(id);
      const response = h.response({
        status: 'success',
        data: {
          result,
        },
        message: 'Album deleted successfully',
      });
      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = Handler;
