import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import useBoards from '../../../domains/boards/hooks/use-boards';
import BoardsPage from './Boards';

jest.mock('../../../domains/boards/hooks/use-boards');
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('BoardsPage', () => {
  const queryClient = new QueryClient();
  const mockBoards = [
    { id: 1, name: 'Project A', description: 'Description A' },
    { id: 2, name: 'Project B', description: 'Description B' }
  ];

  beforeEach(() => {
    (useBoards as jest.Mock).mockReturnValue({
      data: mockBoards,
      isLoading: false
    });
  });

  const renderBoardsPage = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BoardsPage />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  it('should display boards', () => {
    renderBoardsPage();
    expect(screen.getByText('Project A')).toBeInTheDocument();
    expect(screen.getByText('Project B')).toBeInTheDocument();
  });

  it('should navigate to board on click', () => {
    renderBoardsPage();
    fireEvent.click(screen.getByText('Project A'));
    expect(mockedUseNavigate).toHaveBeenCalledWith('/board/1');
  });

  it('should show loading state', () => {
    (useBoards as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true
    });
    renderBoardsPage();
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('should show empty state', () => {
    (useBoards as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false
    });
    renderBoardsPage();
    expect(screen.getByText('Нет досок')).toBeInTheDocument();
  });
});
