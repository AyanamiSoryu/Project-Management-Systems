import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapCreateTaskResponseToModel from '../mappers/map-create-task-response-to-model';
import { mapPriorityToDto } from '../mappers/map-priority-to-dto';
import { CreateIssueResponse, CreateIssueResponseWithError } from '../models';
import { Priority } from '../models/prority';
import { literalForIssues } from './use-issue';

const fetchCreateIssue = async (params: {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: Priority | null;
  title: string;
}): Promise<CreateIssueResponse | CreateIssueResponseWithError> => {
  const { assigneeId, boardId, description, priority, title } = params;
  const response = await Service.postTasksCreate({
    assigneeId,
    boardId,
    description,
    priority: priority ? mapPriorityToDto(priority) : undefined,
    title
  });
  return mapCreateTaskResponseToModel(response);
};

const useCreateIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchCreateIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: literalForIssues });
    }
  });
};

export default useCreateIssue;
