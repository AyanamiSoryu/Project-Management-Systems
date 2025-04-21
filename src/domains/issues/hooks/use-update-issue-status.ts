import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import { mapStatusToDto } from '../mappers/map-status-to-dto';
import mapUpdateTaskStatusResponseToModel from '../mappers/map-update-task-status-response-to-model';
import { Status } from '../models/status';
import { UpdateStatusResponse } from '../models/update-status-response';
import { literalForIssues } from './use-issue';

const fetchUpdateIssueStatus = async (params: {
  taskId: number;
  status: Status | null;
}): Promise<UpdateStatusResponse> => {
  const { taskId, status } = params;
  const response = await Service.putTasksUpdateStatus(taskId, {
    status: status ? mapStatusToDto(status) : undefined
  });
  return mapUpdateTaskStatusResponseToModel(response);
};

const useUpdateIssueStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchUpdateIssueStatus,
    onSuccess: () => {
      console.log('Задача успешно изменила статус');
      queryClient.invalidateQueries({ queryKey: literalForIssues });
    }
  });
};

export default useUpdateIssueStatus;
