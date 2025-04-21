import { Priority } from '../models/prority';
import mapPriorityFromDto from './map-piority-from-dto';

describe('mapPriorityFromDto', () => {
  it('should map "Low" to Priority.Low', () => {
    expect(mapPriorityFromDto('Low')).toBe(Priority.Low);
  });

  it('should map "Medium" to Priority.Medium', () => {
    expect(mapPriorityFromDto('Medium')).toBe(Priority.Medium);
  });

  it('should map "High" to Priority.High', () => {
    expect(mapPriorityFromDto('High')).toBe(Priority.High);
  });

  it('should return undefined for unknown values', () => {
    expect(mapPriorityFromDto('Unknown')).toBeUndefined();
  });

  it('should return undefined for undefined input', () => {
    expect(mapPriorityFromDto(undefined)).toBeUndefined();
  });
});
