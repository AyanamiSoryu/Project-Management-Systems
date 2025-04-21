import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import useBoards from '../../../domains/boards/hooks/use-boards';
import useCreateIssue from '../../../domains/issues/hooks/use-create-issue';
import useUsers from '../../../domains/users/hooks/useUsers';
import TaskModal from './Task-modal';

jest.mock('../../../domains/boards/hooks/useBoards');
jest.mock('../../../domains/users/hooks/useUsers');
jest.mock('../../../domains/issues/hooks/useCreateIssue');

describe('TaskModal', () => {
  const queryClient = new QueryClient();
  const mockCreateIssue = jest.fn();

  const mockBoards = [{ id: 1, name: 'Project A' }];
  const mockUsers = [{ id: 1, fullName: 'John Doe' }];

  beforeEach(() => {
    (useBoards as jest.Mock).mockReturnValue({ data: mockBoards, isLoading: false });
    (useUsers as jest.Mock).mockReturnValue({ data: mockUsers });
    (useCreateIssue as jest.Mock).mockReturnValue({ mutate: mockCreateIssue });
  });

  const renderTaskModal = (props = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <TaskModal open onClose={() => {}} {...props} />
      </QueryClientProvider>
    );
  };

  it('should render all form fields', () => {
    renderTaskModal();

    expect(screen.getByLabelText(/название/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/описание/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/проект/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/приоритет/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/статус/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/исполнитель/i)).toBeInTheDocument();
  });

  it('should call createIssue on form submit', async () => {
    renderTaskModal();

    fireEvent.change(screen.getByLabelText(/название/i), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByLabelText(/описание/i), { target: { value: 'Task Description' } });

    const projectSelect = screen.getByLabelText(/проект/i);
    fireEvent.mouseDown(projectSelect);
    fireEvent.click(screen.getByText('Project A'));

    fireEvent.click(screen.getByText('Создать'));

    await waitFor(() => {
      expect(mockCreateIssue).toHaveBeenCalled();
    });
  });
});
