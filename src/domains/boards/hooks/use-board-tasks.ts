import { useQuery } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapGetTasksOnBoardResponseToModel from '../mappers/map-get-tasks-on-board-response-to-model';
import { TaskOnBoard } from '../models/task-on-board';
import { useBoardsQueryKey } from './use-boards';

const useBoardsTasksQueryKeyPrefix = [...useBoardsQueryKey];

const fetchBoardTasks = async (boardId: number): Promise<TaskOnBoard[]> => {
  const response = await Service.getBoards1(boardId);
  return mapGetTasksOnBoardResponseToModel(response);
};

const useBoardTasks = (boardId: number) =>
  useQuery<TaskOnBoard[]>({
    queryKey: [...useBoardsTasksQueryKeyPrefix, boardId],
    queryFn: () => fetchBoardTasks(boardId),
    enabled: !!boardId
  });

export default useBoardTasks;
