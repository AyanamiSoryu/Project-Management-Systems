import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useBoard } from '../../../domains/boards/hooks/use-board';
import useBoardTasks from '../../../domains/boards/hooks/use-board-tasks';
import BoardPage from './Board-page';

jest.mock('../../../domains/boards/hooks/useBoard');
jest.mock('../../../domains/boards/hooks/useBoardTasks');

describe('BoardPage', () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  });

  const mockBoard = {
    id: 1,
    name: 'Test Project',
    description: 'Test Description',
    taskCount: 5
  };

  const mockTasks = [
    {
      id: 1,
      title: 'Task 1',
      status: 'Backlog',
      priority: 'High'
    },
    {
      id: 2,
      title: 'Task 2',
      status: 'InProgress',
      priority: 'Medium'
    }
  ];

  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({ data: mockBoard });
    (useBoardTasks as jest.Mock).mockReturnValue({ data: mockTasks });
  });

  const renderBoardPage = (initialRoute = '/board/1') => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path='/board/:id' element={<BoardPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('should render board name', async () => {
    renderBoardPage();

    await waitFor(() => {
      expect(screen.getByText('Test Project')).toBeInTheDocument();
    });
  });

  it('should render columns for each status', async () => {
    renderBoardPage();

    await waitFor(() => {
      expect(screen.getByText('To do')).toBeInTheDocument();
      expect(screen.getByText('In progress')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
    });
  });
});
