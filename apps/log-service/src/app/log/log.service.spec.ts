import { TestBed } from '@automock/jest';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeAll(async () => {
    const { unit } = TestBed.create(LogService).compile();

    service = unit;
  });

  describe('save', () => {
    it('should return a log', async () => {
      const mockBody = {
        fromService: 'log.service',
        service: 'save',
        timestamps: new Date(),
      };
      const result = await service.save(mockBody);

      expect(result).toBeUndefined();
    });
  });
});
