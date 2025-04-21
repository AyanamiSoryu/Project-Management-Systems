import { errs_ErrorResponse, models_CreateTaskResponse } from '../../../shared/networking/generated';
import { CreateIssueResponse, CreateIssueResponseWithError } from '../models';

const mapCreateTaskResponseToModel = (
  dto: models_CreateTaskResponse | errs_ErrorResponse
): CreateIssueResponse | CreateIssueResponseWithError => {
  if ('id' in dto) {
    return {
      id: dto.id ?? 0
    };
  }
  if ('error' in dto && 'message' in dto) {
    return {
      error: dto.error ?? '',
      message: dto.message ?? ''
    };
  }
  return {
    error: 'Ошибка при создании задачи',
    message: 'Ошибка при создании задачи'
  };
};

export default mapCreateTaskResponseToModel;
