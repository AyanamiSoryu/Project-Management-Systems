import { models_GetBoardsResponse } from '../../../shared/networking/generated';
import { Board } from '../models';

const mapGetBoardsResponseToModel = (dto: models_GetBoardsResponse[]): Board[] => {
  return dto.map((board) => {
    return {
      description: board.description ?? '',
      id: board.id ?? 0,
      name: board.name ?? '',
      taskCount: board.taskCount ?? 0
    };
  });
};

export default mapGetBoardsResponseToModel;
