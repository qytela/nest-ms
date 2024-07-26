import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { PromModule } from './prom/prom.module';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PromModule],
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return a message', async () => {
      const mockReq = <Request>{
        url: '/api',
        method: 'GET',
      };
      const result = await service.getData(mockReq);

      expect(result).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        })
      );
    });
  });

  describe('testFail', () => {
    it('should return a message', async () => {
      const mockReq = <Request>{
        url: '/api/test-fail',
        method: 'GET',
      };
      const result = await service.testFail(mockReq);

      expect(result).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        })
      );
    });
  });
});
