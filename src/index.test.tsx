import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn()
  }))
}));

describe('Application Entry Point', () => {
  it('should render app inside QueryClientProvider', () => {
    const mockRoot = { render: jest.fn() };
    (ReactDOM.createRoot as jest.Mock).mockReturnValue(mockRoot);

    require('./index');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(expect.any(HTMLElement));
    expect(mockRoot.render).toHaveBeenCalledWith(
      expect.objectContaining({
        type: React.StrictMode,
        props: expect.objectContaining({
          children: expect.objectContaining({
            type: QueryClientProvider
          })
        })
      })
    );
  });
});
