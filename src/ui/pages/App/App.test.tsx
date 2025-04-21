import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

jest.mock(
  '../../pure-components/Header/Header',
  () =>
    function () {
      return <div data-testid='header'>Header</div>;
    }
);
jest.mock(
  '../Issues/Issues',
  () =>
    function () {
      return <div data-testid='issues'>Issues</div>;
    }
);

describe('App', () => {
  const queryClient = new QueryClient();

  it('should render header and default route', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('issues')).toBeInTheDocument();
  });
});
