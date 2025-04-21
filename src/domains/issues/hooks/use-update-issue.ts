import { useMutation } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import { mapPriorityToDto } from '../mappers/map-priority-to-dto';
import { mapStatusToDto } from '../mappers/map-status-to-dto';
import { Priority } from '../models/prority';
import { Status } from '../models/status';
import { UpdateIssueParams } from '../models/update-issue-params';

const updateTask = async (params: UpdateIssueParams) => {
  const { taskId, title, description, assigneeId, priority, status } = params;

  return Service.putTasksUpdate(taskId, {
    title,
    description,
    assigneeId,
    priority: mapPriorityToDto(priority ?? Priority.Low),
    status: mapStatusToDto(status ?? Status.Backlog)
  });
};

const useUpdateIssue = () => {
  return useMutation({
    mutationFn: updateTask
  });
};

export default useUpdateIssue;
