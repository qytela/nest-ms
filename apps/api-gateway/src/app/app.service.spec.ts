import { TestBed } from '@automock/jest';

import { AppService } from './app.service';
import { PromService } from './prom/prom.service';

describe('AppService', () => {
  let service: AppService;
  let promService: jest.Mocked<PromService>;

  beforeAll(async () => {
    const { unit, unitRef } = TestBed.create(AppService).compile();

    service = unit;

    promService = unitRef.get<PromService>(PromService);
    promService.startHttpTimer.mockImplementation(() => ({
      success: () => undefined,
      fail: () => undefined,
    }));
  });

  describe('getData', () => {
    it('should return a message', async () => {
      const mockReq = {
        url: '/api',
        method: 'GET',
      } as Request;
      const result = await service.getData(mockReq);

      expect(promService.startHttpTimer).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        })
      );
    });
  });

  describe('testFail', () => {
    it('should return a message', async () => {
      const mockReq = {
        url: '/api/test-fail',
        method: 'GET',
      } as Request;
      const result = await service.testFail(mockReq);

      expect(promService.startHttpTimer).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({
          message: expect.any(String),
        })
      );
    });
  });
});
