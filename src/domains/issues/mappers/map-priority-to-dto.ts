import { models_CreateTaskRequest } from '../../../shared/networking/generated';
import { Priority } from '../models/prority';

export const mapPriorityToDto = (priority: Priority): models_CreateTaskRequest.priority => {
  switch (priority) {
    case 'Low':
      return models_CreateTaskRequest.priority.LOW;
    case 'Medium':
      return models_CreateTaskRequest.priority.MEDIUM;
    case 'High':
      return models_CreateTaskRequest.priority.HIGH;
    default:
      return models_CreateTaskRequest.priority.LOW;
  }
};
