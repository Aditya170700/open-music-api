/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

const ClientError = require('../../exceptions/ClientError');
const { response } = require('../../utils/response');

class AuthenticationsHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    try {
      this._validator.validatePostAuthenticationPayload(request.payload);

      const { username, password } = request.payload;
      const id = await this._usersService.verifyUserCredential(username, password);

      const accessToken = this._tokenManager.generateAccessToken({ id });
      const refreshToken = this._tokenManager.generateRefreshToken({ id });

      await this._authenticationsService.addRefreshToken(refreshToken);

      return response(h, 'success', 201, 'Authentication success', { accessToken, refreshToken });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async putAuthenticationHandler(request, h) {
    try {
      this._validator.validatePutAuthenticationPayload(request.payload);

      const { refreshToken } = request.payload;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

      const accessToken = this._tokenManager.generateAccessToken({ id });
      return response(h, 'success', 200, 'Authentication success', { accessToken });
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }

  async deleteAuthenticationHandler(request, h) {
    try {
      this._validator.validateDeleteAuthenticationPayload(request.payload);

      const { refreshToken } = request.payload;
      await this._authenticationsService.verifyRefreshToken(refreshToken);
      await this._authenticationsService.deleteRefreshToken(refreshToken);

      return response(h, 'success', 200, 'Refresh token berhasil dihapus');
    } catch (error) {
      if (error instanceof ClientError) {
        return response(h, 'fail', error.statusCode, error.message);
      }

      return response(h);
    }
  }
}

module.exports = AuthenticationsHandler;
