import { Priority } from './prority';
import { Status } from './status';

export type UpdateIssueParams = {
  taskId: number;
  title: string;
  description: string;
  assigneeId: number;
  priority?: Priority;
  status?: Status;
};
