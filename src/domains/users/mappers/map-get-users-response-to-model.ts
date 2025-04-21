import { models_GetUsersResponse } from '../../../shared/networking/generated';
import { User } from '../models/user';

const mapGetUsersResponseToModel = (dto: models_GetUsersResponse[]): User[] => {
  return dto.map((user) => ({
    id: user.id ?? 0,
    avatarUrl: user.avatarUrl ?? '',
    description: user.description ?? '',
    email: user.email ?? '',
    fullName: user.fullName ?? '',
    tasksCount: user.tasksCount ?? 0,
    teamId: user.teamId ?? 0,
    teamName: user.teamName ?? ''
  }));
};

export default mapGetUsersResponseToModel;
