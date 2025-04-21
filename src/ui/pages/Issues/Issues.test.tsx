import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import useIssue from '../../../domains/issues/hooks/use-issue';
import { Priority } from '../../../domains/issues/models/prority';
import { Status } from '../../../domains/issues/models/status';
import Issues from './Issues';

jest.mock('../../../domains/issues/hooks/useIssue');

describe('Issues', () => {
  const queryClient = new QueryClient();
  const mockIssues = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      priority: Priority.High,
      status: Status.InProgress,
      boardName: 'Board 1',
      assignee: { id: 1, fullName: 'John Doe' }
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description 2',
      priority: Priority.Low,
      status: Status.Backlog,
      boardName: 'Board 2',
      assignee: { id: 2, fullName: 'Jane Smith' }
    }
  ];

  beforeEach(() => {
    (useIssue as jest.Mock).mockReturnValue({
      data: mockIssues,
      isLoading: false
    });
  });

  const renderIssues = () => {
    return render(
      <QueryClientProvider client={queryClient}>
        <Issues />
      </QueryClientProvider>
    );
  };

  it('should display all issues', () => {
    renderIssues();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should filter by search term', () => {
    renderIssues();
    const searchInput = screen.getByLabelText(/поиск по названию/i);
    fireEvent.change(searchInput, { target: { value: 'Task 1' } });

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  it('should filter by status', () => {
    renderIssues();
    const statusSelect = screen.getByLabelText(/статус/i);
    fireEvent.mouseDown(statusSelect);
    fireEvent.click(screen.getByText('InProgress'));

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
