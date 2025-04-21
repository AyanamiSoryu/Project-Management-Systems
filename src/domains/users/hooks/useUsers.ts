import { useQuery } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapGetUsersResponseToModel from '../mappers/map-get-users-response-to-model';
import { User } from '../models/user';

const magicLiteral = ['users'];

const fetchUsers = async (): Promise<User[]> => {
  const response = await Service.getUsers();
  return mapGetUsersResponseToModel(response);
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: magicLiteral,
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: false
  });

export default useUsers;
