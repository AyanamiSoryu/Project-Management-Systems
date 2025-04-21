import { useQuery } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapGetTeamsResponseToModel from '../mappers/map-get-teams-response-to-model';
import { Team } from '../models/team';

const magicLiteral = ['teams'];

const fetchTeams = async (): Promise<Team[]> => {
  const response = await Service.getTeams();
  return mapGetTeamsResponseToModel(response);
};

const useTeams = () =>
  useQuery<Team[]>({
    queryKey: magicLiteral,
    queryFn: fetchTeams,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: false
  });

export default useTeams;
