import { errs_ErrorResponse, models_UpdateTaskResponse } from '../../../shared/networking/generated';
import { CreateIssueResponseWithError } from '../models';
import { UpdateStatusResponse } from '../models/update-status-response';

const mapUpdateTaskStatusResponseToModel = (
  dto: models_UpdateTaskResponse | errs_ErrorResponse
): UpdateStatusResponse | CreateIssueResponseWithError => {
  if ('message' in dto) {
    return {
      message: dto.message ?? ''
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

export default mapUpdateTaskStatusResponseToModel;
