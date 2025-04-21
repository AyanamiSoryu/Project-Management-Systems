import { CancelablePromise, CancelError } from './CancelablePromise';

describe('CancelablePromise', () => {
  it('should resolve with value', async () => {
    const promise = new CancelablePromise<string>((resolve) => {
      resolve('test');
    });

    await expect(promise).resolves.toBe('test');
  });

  it('should reject with error', async () => {
    const promise = new CancelablePromise<string>((_, reject) => {
      reject(new Error('test error'));
    });

    await expect(promise).rejects.toThrow('test error');
  });

  it('should handle cancellation', async () => {
    const promise = new CancelablePromise<string>((resolve, _, onCancel) => {
      onCancel(() => {
        // Cleanup logic
      });
      setTimeout(() => resolve('test'), 100);
    });

    promise.cancel();

    await expect(promise).rejects.toThrow(CancelError);
    expect(promise.isCancelled).toBe(true);
  });
});
