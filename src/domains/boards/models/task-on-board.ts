import { Priority } from '../../issues/models/prority';
import { Status } from '../../issues/models/status';

export type TaskOnBoard = {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  assignee?: {
    id: number;
    fullName: string;
    email?: string;
    avatarUrl?: string;
  };
};
