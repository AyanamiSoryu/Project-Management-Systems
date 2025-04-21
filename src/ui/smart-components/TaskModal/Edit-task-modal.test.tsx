import { fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';

import useIssueById from '../../../domains/issues/hooks/use-issue-by-id';
import useUpdateIssue from '../../../domains/issues/hooks/use-update-issue';
import useUsers from '../../../domains/users/hooks/use-users';
import { render } from '../../../test-utils';
import EditTaskModal from './Edit-task-modal';

jest.mock('../../../domains/issues/hooks/use-issue-by-id');
jest.mock('../../../domains/issues/hooks/use-update-issue');
jest.mock('../../../domains/users/hooks/use-users');

// Also mock useNavigate directly
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('EditTaskModal', () => {
  const mockTask = {
    id: 1,
    title: 'Task 1',
    description: 'Description 1',
    priority: 'High',
    status: 'InProgress',
    assignee: { id: 1, fullName: 'John Doe' }
  };

  const mockUsers = [
    { id: 1, fullName: 'John Doe' },
    { id: 2, fullName: 'Jane Smith' }
  ];

  const mockUpdateIssue = jest.fn();

  beforeEach(() => {
    (useIssueById as jest.Mock).mockReturnValue({
      data: mockTask,
      isLoading: false
    });
    (useUsers as jest.Mock).mockReturnValue({
      data: mockUsers,
      isLoading: false
    });
    (useUpdateIssue as jest.Mock).mockReturnValue({
      mutate: mockUpdateIssue
    });
    jest.clearAllMocks();
  });

  const renderEditTaskModal = (taskId: number | null = 1) => {
    return render(<EditTaskModal open onClose={() => {}} taskId={taskId} />);
  };

  it('should load task data', async () => {
    renderEditTaskModal();

    await waitFor(() => {
      expect(screen.getByLabelText(/название/i)).toHaveValue('Task 1');
      expect(screen.getByLabelText(/описание/i)).toHaveValue('Description 1');
    });
  });

  it('should submit form correctly', async () => {
    renderEditTaskModal();

    fireEvent.change(screen.getByLabelText(/название/i), { target: { value: 'Updated Task' } });
    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(mockUpdateIssue).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Updated Task' }),
        expect.any(Object)
      );
    });
  });

  it('should show error for empty title', async () => {
    renderEditTaskModal();

    fireEvent.change(screen.getByLabelText(/название/i), { target: { value: '' } });
    fireEvent.click(screen.getByText('Сохранить'));

    await waitFor(() => {
      expect(screen.getByText('Название задачи обязательно')).toBeInTheDocument();
    });
  });
});
