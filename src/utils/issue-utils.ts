import { Status } from '../domains/issues/models/status';

export enum Priority {
  HIGHEST = 'HIGHEST',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  LOWEST = 'LOWEST'
}

export enum TaskType {
  TASK = 'TASK',
  BUG = 'BUG',
  FEATURE = 'FEATURE',
  IMPROVEMENT = 'IMPROVEMENT'
}

/**
 * Returns color for task priority
 */
export const getTaskPriorityColor = (priority: string): string => {
  switch (priority) {
    case Priority.HIGHEST:
      return '#d50000';
    case Priority.HIGH:
      return '#ff6d00';
    case Priority.MEDIUM:
      return '#ffab00';
    case Priority.LOW:
      return '#2e7d32';
    case Priority.LOWEST:
      return '#0277bd';
    default:
      return '#9e9e9e';
  }
};

/**
 * Returns icon component for task type
 */
export const getStatusColor = (status: Status): string => {
  switch (status) {
    case Status.Backlog:
      return '#e0e0e0';
    case Status.InProgress:
      return '#bbdefb';
    case Status.Done:
      return '#c8e6c9';
    default:
      return '#e0e0e0';
  }
};
