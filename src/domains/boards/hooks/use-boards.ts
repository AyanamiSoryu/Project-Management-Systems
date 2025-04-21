import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Service } from '../../../shared/networking/generated';
import mapGetBoardsResponseToModel from '../mappers/map-get-boards-response-to-model';
import { Board } from '../models';

export const useBoardsQueryKey = ['boards'];
const fetchBoards = async (): Promise<Board[]> => {
  // return Service.getBoards().then(mapGetBoardsResponseToModel);
  const response = await Service.getBoards();
  return mapGetBoardsResponseToModel(response);
};

const useBoards = <TData = Board[]>(options?: Partial<UseQueryOptions<Board[], unknown, TData>>) =>
  useQuery<Board[], unknown, TData>({
    queryKey: useBoardsQueryKey,
    queryFn: fetchBoards,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 2 * 60 * 1000,
    refetchIntervalInBackground: false,
    ...options
  });

export default useBoards;
