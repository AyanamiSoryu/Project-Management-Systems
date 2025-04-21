import { models_GetTasksResponse } from '../../../shared/networking/generated';
import { Issue } from '../models';
import { Priority } from '../models/prority';
import { Status } from '../models/status';
import mapPriorityFromDto from './map-piority-from-dto';
import mapStatusFromDto from './map-status-from-dto';

const mapGetTasksResponseToModel = (dto: models_GetTasksResponse[]): Issue[] => {
  return dto.map((task) => ({
    assignee: {
      avatarUrl: task.assignee?.avatarUrl ?? '',
      email: task.assignee?.email ?? '',
      fullName: task.assignee?.fullName ?? '',
      id: task.assignee?.id ?? 0
    },
    boardId: task.boardId ?? 0,
    boardName: task.boardName ?? '',
    description: task.description ?? '',
    id: task.id ?? 0,
    priority: mapPriorityFromDto(task.priority) ?? Priority.Low,
    status: mapStatusFromDto(task.status) ?? Status.Backlog,
    title: task.title ?? ''
  }));
};

export default mapGetTasksResponseToModel;
