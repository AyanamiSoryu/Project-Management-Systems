import { models_GetTasksOnBoardResponse } from '../../../shared/networking/generated';
import mapPriorityFromDto from '../../issues/mappers/map-piority-from-dto';
import mapStatusFromDto from '../../issues/mappers/map-status-from-dto';
import { Priority } from '../../issues/models/prority';
import { Status } from '../../issues/models/status';
import { TaskOnBoard } from '../models/task-on-board';

const mapGetTasksOnBoardResponseToModel = (response: models_GetTasksOnBoardResponse[]): TaskOnBoard[] => {
  return response.map((task) => ({
    id: task.id ?? 0,
    title: task.title ?? '',
    description: task.description ?? '',
    priority: mapPriorityFromDto(task.priority) ?? Priority.Low,
    status: mapStatusFromDto(task.status) ?? Status.Backlog,
    assignee: task.assignee
      ? {
          id: task.assignee.id ?? 0,
          fullName: task.assignee.fullName ?? '',
          email: task.assignee.email,
          avatarUrl: task.assignee.avatarUrl
        }
      : undefined
  }));
};

export default mapGetTasksOnBoardResponseToModel;
