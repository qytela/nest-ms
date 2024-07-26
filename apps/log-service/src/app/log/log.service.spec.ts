import { Test, TestingModule } from '@nestjs/testing';

import { LogService } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    const module: TestingModule = await Test.createTestingModule({
      providers: [LogService],
    }).compile();

    service = module.get<LogService>(LogService);
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
