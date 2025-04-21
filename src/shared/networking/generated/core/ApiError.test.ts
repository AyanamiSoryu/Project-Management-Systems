import { ApiError } from './ApiError';
import { ApiRequestOptions } from './ApiRequestOptions';
import { ApiResult } from './ApiResult';

describe('ApiError', () => {
  it('should create error with correct properties', () => {
    const request: ApiRequestOptions = {
      method: 'GET',
      url: '/test'
    };

    const response: ApiResult = {
      url: '/test',
      ok: false,
      status: 404,
      statusText: 'Not Found',
      body: { error: 'Resource not found' }
    };

    const error = new ApiError(request, response, 'Test error message');

    expect(error.name).toBe('ApiError');
    expect(error.message).toBe('Test error message');
    expect(error.status).toBe(404);
    expect(error.statusText).toBe('Not Found');
    expect(error.body).toEqual({ error: 'Resource not found' });
  });
});
