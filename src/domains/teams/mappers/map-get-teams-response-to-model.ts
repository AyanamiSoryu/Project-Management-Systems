import { models_GetTeamsResponse } from '../../../shared/networking/generated';
import { Team } from '../models/team';

const mapGetTeamsResponseToModel = (dto: models_GetTeamsResponse[]): Team[] => {
  return dto.map((team) => ({
    id: team.id ?? 0,
    name: team.name ?? '',
    description: team.description ?? '',
    boardsCount: team.boardsCount ?? 0,
    usersCount: team.usersCount ?? 0
  }));
};

export default mapGetTeamsResponseToModel;
