import { render, screen } from '@testing-library/react';
import React from 'react';

import { TaskOnBoard } from '../../../domains/boards/models/task-on-board';
import { Priority } from '../../../domains/issues/models/prority';
import { Status } from '../../../domains/issues/models/status';
import BoardColumns from './Board-columns';

describe('BoardColumns', () => {
  const mockTasks: Record<Status, TaskOnBoard[]> = {
    [Status.Backlog]: [
      {
        id: 1,
        title: 'Task 1',
        status: Status.Backlog,
        priority: Priority.High
      }
    ],
    [Status.InProgress]: [
      {
        id: 2,
        title: 'Task 2',
        status: Status.InProgress,
        priority: Priority.Medium
      }
    ],
    [Status.Done]: []
  };

  const mockOnStatusChange = jest.fn();

  it('should render all columns', () => {
    render(<BoardColumns tasksByStatusMap={mockTasks} onStatusChange={mockOnStatusChange} />);

    expect(screen.getByText('To do')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('should display tasks in correct columns', () => {
    render(<BoardColumns tasksByStatusMap={mockTasks} onStatusChange={mockOnStatusChange} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
