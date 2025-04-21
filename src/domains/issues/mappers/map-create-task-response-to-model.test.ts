import mapCreateTaskResponseToModel from './map-create-task-response-to-model';

describe('mapCreateTaskResponseToModel', () => {
  it('should map success response correctly', () => {
    const dto = { id: 123 };
    const result = mapCreateTaskResponseToModel(dto);
    expect(result).toEqual({ id: 123 });
  });

  it('should map error response correctly', () => {
    const dto = { error: 'Error', message: 'Task creation failed' };
    const result = mapCreateTaskResponseToModel(dto);
    expect(result).toEqual({
      error: 'Error',
      message: 'Task creation failed'
    });
  });

  it('should return default error for unknown response', () => {
    const dto = {};
    const result = mapCreateTaskResponseToModel(dto);
    expect(result).toEqual({
      error: 'Ошибка при создании задачи',
      message: 'Ошибка при создании задачи'
    });
  });
});
