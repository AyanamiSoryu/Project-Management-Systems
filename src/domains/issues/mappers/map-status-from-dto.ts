import { Status } from '../models/status';

const mapStatusFromDto = (status?: string): Status | undefined => {
  switch (status) {
    case 'Backlog':
      return Status.Backlog;
    case 'InProgress':
      return Status.InProgress;
    case 'Done':
      return Status.Done;
    default:
      return undefined;
  }
};

export default mapStatusFromDto;
