import { models_UpdateTaskStatusRequest } from '../../../shared/networking/generated';
import { Status } from '../models/status';

export const mapStatusToDto = (priority: Status): models_UpdateTaskStatusRequest.status => {
  switch (priority) {
    case 'Backlog':
      return models_UpdateTaskStatusRequest.status.BACKLOG;
    case 'Done':
      return models_UpdateTaskStatusRequest.status.DONE;
    case 'InProgress':
      return models_UpdateTaskStatusRequest.status.IN_PROGRESS;
    default:
      return models_UpdateTaskStatusRequest.status.BACKLOG;
  }
};
