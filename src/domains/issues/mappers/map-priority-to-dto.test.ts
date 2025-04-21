import { models_CreateTaskRequest, models_UpdateTaskStatusRequest } from '../../../shared/networking/generated';
import { Priority } from '../models/prority';
import { Status } from '../models/status';
import { mapPriorityToDto } from './map-priority-to-dto';
import { mapStatusToDto } from './map-status-to-dto';

describe('mapPriorityToDto', () => {
  it('should map Priority enum to DTO enum', () => {
    expect(mapPriorityToDto(Priority.Low)).toBe(models_CreateTaskRequest.priority.LOW);
    expect(mapPriorityToDto(Priority.Medium)).toBe(models_CreateTaskRequest.priority.MEDIUM);
    expect(mapPriorityToDto(Priority.High)).toBe(models_CreateTaskRequest.priority.HIGH);
  });

  it('should return LOW as default', () => {
    expect(mapPriorityToDto('Unknown' as Priority)).toBe(models_CreateTaskRequest.priority.LOW);
  });
});

describe('mapStatusToDto', () => {
  it('should map Status enum to DTO enum', () => {
    expect(mapStatusToDto(Status.Backlog)).toBe(models_UpdateTaskStatusRequest.status.BACKLOG);
    expect(mapStatusToDto(Status.InProgress)).toBe(models_UpdateTaskStatusRequest.status.IN_PROGRESS);
    expect(mapStatusToDto(Status.Done)).toBe(models_UpdateTaskStatusRequest.status.DONE);
  });
});
