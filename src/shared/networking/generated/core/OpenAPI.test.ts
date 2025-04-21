import { OpenAPI } from './OpenAPI';

describe('OpenAPI', () => {
  it('should have correct default configuration', () => {
    expect(OpenAPI.BASE).toBe('http://localhost:8080/api/v1');
    expect(OpenAPI.VERSION).toBe('1.0');
    expect(OpenAPI.WITH_CREDENTIALS).toBe(false);
    expect(OpenAPI.CREDENTIALS).toBe('include');
  });
});
