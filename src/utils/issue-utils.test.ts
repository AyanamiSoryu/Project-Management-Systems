import { Status } from '../domains/issues/models/status';
import { getStatusColor, getTaskPriorityColor, Priority } from './issue-utils';

describe('issue-utils', () => {
  describe('getTaskPriorityColor', () => {
    it('should return correct colors for each priority', () => {
      expect(getTaskPriorityColor(Priority.HIGHEST)).toBe('#d50000');
      expect(getTaskPriorityColor(Priority.HIGH)).toBe('#ff6d00');
      expect(getTaskPriorityColor(Priority.MEDIUM)).toBe('#ffab00');
      expect(getTaskPriorityColor(Priority.LOW)).toBe('#2e7d32');
      expect(getTaskPriorityColor(Priority.LOWEST)).toBe('#0277bd');
    });

    it('should return default color for unknown priority', () => {
      expect(getTaskPriorityColor('UNKNOWN')).toBe('#9e9e9e');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for each status', () => {
      expect(getStatusColor(Status.Backlog)).toBe('#e0e0e0');
      expect(getStatusColor(Status.InProgress)).toBe('#bbdefb');
      expect(getStatusColor(Status.Done)).toBe('#c8e6c9');
    });
  });
});
