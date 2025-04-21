import { models_GetTaskByIDResponse } from '../../../shared/networking/generated';
import { IssueResponseById } from '../models/issue-response-by-id';
import { Priority } from '../models/prority';
import { Status } from '../models/status';
import mapPriorityFromDto from './map-piority-from-dto';
import mapStatusFromDto from './map-status-from-dto';

const mapGetTaskByIdResponseToModel = (response: models_GetTaskByIDResponse): IssueResponseById => {
  return {
    id: response.id ?? 0,
    title: response.title ?? '',
    description: response.description ?? '',
    priority: mapPriorityFromDto(response.priority) ?? Priority.Low,
    status: mapStatusFromDto(response.status) ?? Status.Backlog,
    boardName: response.boardName ?? '',
    assignee: {
      avatarUrl: response.assignee?.avatarUrl ?? '',
      email: response.assignee?.email ?? '',
      fullName: response.assignee?.fullName ?? '',
      id: response.assignee?.id ?? 0
    }
  };
};

export default mapGetTaskByIdResponseToModel;
