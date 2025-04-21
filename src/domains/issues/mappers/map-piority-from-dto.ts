import { Priority } from '../models/prority';

const mapPriorityFromDto = (priority?: string): Priority | undefined => {
  switch (priority) {
    case 'Low':
      return Priority.Low;
    case 'Medium':
      return Priority.Medium;
    case 'High':
      return Priority.High;
    default:
      return undefined;
  }
};

export default mapPriorityFromDto;
