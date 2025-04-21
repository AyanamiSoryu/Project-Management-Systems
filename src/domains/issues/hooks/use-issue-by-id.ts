import { useQuery } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapGetTaskByIdResponseToModel from '../mappers/map-get-issue-by-id-response-to-model';
import { IssueResponseById } from '../models/issue-response-by-id';
import { literalForIssues } from './use-issue';

export const useTaskQueryKey = [...literalForIssues];

const fetchTask = async (taskId: number): Promise<IssueResponseById> => {
  const response = await Service.getTasks1(taskId);
  return mapGetTaskByIdResponseToModel(response);
};

const useTask = (taskId: number) =>
  useQuery<IssueResponseById>({
    queryKey: [...useTaskQueryKey, taskId],
    queryFn: () => fetchTask(taskId),
    enabled: !!taskId
  });

export default useTask;
