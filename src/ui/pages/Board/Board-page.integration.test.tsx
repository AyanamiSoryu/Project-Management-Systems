import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { useBoard } from '../../../domains/boards/hooks/use-board';
import useBoardTasks from '../../../domains/boards/hooks/use-board-tasks';
import useUpdateIssueStatus from '../../../domains/issues/hooks/use-update-isuue-status';
import BoardPage from './Board-page';

jest.mock('../../../domains/boards/hooks/useBoard');
jest.mock('../../../domains/boards/hooks/useBoardTasks');
jest.mock('../../../domains/issues/hooks/useUpdateIsuueStatus');

describe('BoardPage Integration', () => {
  const queryClient = new QueryClient();
  const mockUpdateStatus = jest.fn();

  const mockBoard = {
    id: 1,
    name: 'Project Alpha',
    description: 'Test Project'
  };

  const mockTasks = [
    { id: 1, title: 'Task 1', status: 'Backlog', priority: 'High' },
    { id: 2, title: 'Task 2', status: 'InProgress', priority: 'Medium' }
  ];

  beforeEach(() => {
    (useBoard as jest.Mock).mockReturnValue({ data: mockBoard });
    (useBoardTasks as jest.Mock).mockReturnValue({ data: mockTasks });
    (useUpdateIssueStatus as jest.Mock).mockReturnValue({ mutate: mockUpdateStatus });
  });

  const renderBoardPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/board/1']}>
          <Routes>
            <Route path='/board/:id' element={<BoardPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('should render board with tasks', async () => {
    renderBoardPage();

    await waitFor(() => {
      expect(screen.getByText('Project Alpha')).toBeInTheDocument();
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });
  });

  it('should handle drag and drop operations', () => {
    renderBoardPage();
    // Test drag and drop logic
  });
});
