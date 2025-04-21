import { Priority } from './prority';
import { Status } from './status';

type AssigneeUser = {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
};

export type Issue = {
  assignee: AssigneeUser;
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
};
