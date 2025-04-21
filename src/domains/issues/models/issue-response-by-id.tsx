import { Priority } from './prority';
import { Status } from './status';

export type IssueResponseById = {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  boardName?: string;
  assignee?: {
    id: number;
    fullName: string;
    email?: string;
    avatarUrl?: string;
  };
};
