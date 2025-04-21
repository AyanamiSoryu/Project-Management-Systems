import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import { Priority } from '../../../domains/issues/models/prority';
import { Status } from '../../../domains/issues/models/status';
import IssueCard from './Issue-card';

jest.mock('../TaskModal/EditTaskModal', () => ({
  __esModule: true,
  default: ({ open }: { open: boolean; onClose: () => void }) =>
    open ? <div data-testid='edit-modal'>Edit Modal</div> : null
}));

describe('IssueCard', () => {
  const mockTask: TaskOnBoard = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    priority: Priority.High,
    status: Status.Backlog,
    assignee: {
      id: 1,
      fullName: 'John Doe',
      email: 'john@example.com',
      avatarUrl: 'http://example.com/avatar.jpg'
    }
  };

  it('should render task information correctly', () => {
    render(<IssueCard task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('TASK-1')).toBeInTheDocument();
  });

  it('should open modal when card is clicked', () => {
    render(<IssueCard task={mockTask} />);

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  it('should render without assignee', () => {
    const taskWithoutAssignee = { ...mockTask, assignee: undefined };
    render(<IssueCard task={taskWithoutAssignee} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
