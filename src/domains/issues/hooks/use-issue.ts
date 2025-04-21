import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapGetTasksResponseToModel from '../mappers/map-get-tasks-response-to-model';
import { Issue } from '../models';

export const literalForIssues = ['issues'];

const fetchIssues = async (): Promise<Issue[]> => {
  const response = await Service.getTasks();
  return mapGetTasksResponseToModel(response);
};

const useIssues = <TData = Issue[]>(options?: Partial<UseQueryOptions<Issue[], unknown, TData>>) =>
  useQuery<Issue[], unknown, TData>({
    queryKey: literalForIssues,
    queryFn: fetchIssues,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: false,
    ...options
  });

export default useIssues;
