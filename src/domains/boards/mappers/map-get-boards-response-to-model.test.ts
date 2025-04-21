import { models_GetBoardsResponse } from '../../../shared/networking/generated';
import mapGetBoardsResponseToModel from './map-get-boards-response-to-model';

describe('mapGetBoardsResponseToModel', () => {
  it('should correctly map response to model', () => {
    const mockResponse: models_GetBoardsResponse[] = [
      {
        id: 1,
        name: 'Project A',
        description: 'Description A',
        taskCount: 5
      },
      {
        id: 2,
        name: 'Project B',
        description: 'Description B',
        taskCount: 3
      }
    ];

    const result = mapGetBoardsResponseToModel(mockResponse);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      name: 'Project A',
      description: 'Description A',
      taskCount: 5
    });
    expect(result[1]).toEqual({
      id: 2,
      name: 'Project B',
      description: 'Description B',
      taskCount: 3
    });
  });

  it('should handle empty values with defaults', () => {
    const mockResponse: models_GetBoardsResponse[] = [
      {
        id: undefined,
        name: undefined,
        description: undefined,
        taskCount: undefined
      }
    ];

    const result = mapGetBoardsResponseToModel(mockResponse);

    expect(result[0]).toEqual({
      id: 0,
      name: '',
      description: '',
      taskCount: 0
    });
  });
});
