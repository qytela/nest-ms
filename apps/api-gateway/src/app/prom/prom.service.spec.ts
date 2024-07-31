import { Test, TestingModule } from '@nestjs/testing';
import { MakeMetricsProvider } from 'shared/utils/prom-client/MakeMetricsProvider';

import { PromService } from './prom.service';

import type { IStartHTTPTimerOptions } from 'shared/interfaces/PromService';

describe('PromService', () => {
  let service: PromService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromService, ...MakeMetricsProvider()],
    }).compile();

    service = module.get<PromService>(PromService);
  });

  describe('startHttpTimer', () => {
    it('should increment the httpReqTotal counter', async () => {
      const mockReq = {
        url: '/api/test',
        method: 'GET',
      } as Request;
      const mockOptions: IStartHTTPTimerOptions = { operation: 'test' };

      jest.spyOn(service.httpReqTotal, 'inc').mockReturnValue();
      service.startHttpTimer(mockReq, mockOptions);

      expect(service.httpReqTotal.inc).toHaveBeenCalled();
      expect(service['req']).toBe(mockReq);
      expect(service['options']).toBe(mockOptions);
    });

    it('should run "success" function', async () => {
      const mockReq = {
        url: '/api/test',
        method: 'GET',
      } as Request;
      const mockOptions: IStartHTTPTimerOptions = { operation: 'test' };

      jest.spyOn(service.httpReqTotal, 'inc').mockReturnValue();
      const startHttpTimer = service.startHttpTimer(mockReq, mockOptions);

      jest.spyOn(service.httpReqTimeSeconds, 'startTimer').mockReturnValue(jest.fn());
      jest.spyOn(service.dbResTimeSeconds, 'startTimer').mockReturnValue(jest.fn());
      startHttpTimer.success();

      expect(service.httpReqTimeSeconds.startTimer).toHaveBeenCalled();
      expect(service.dbResTimeSeconds.startTimer).toHaveBeenCalled();
    });

    it('should run "fail" function', async () => {
      const mockReq = {
        url: '/api/test',
        method: 'GET',
      } as Request;
      const mockOptions: IStartHTTPTimerOptions = { operation: 'test' };

      jest.spyOn(service.httpReqTotal, 'inc').mockReturnValue();
      const startHttpTimer = service.startHttpTimer(mockReq, mockOptions);

      jest.spyOn(service.httpReqFailTotal, 'startTimer').mockReturnValue(jest.fn());
      jest.spyOn(service.dbResTimeSeconds, 'startTimer').mockReturnValue(jest.fn());
      startHttpTimer.fail();

      expect(service.httpReqFailTotal.startTimer).toHaveBeenCalled();
      expect(service.dbResTimeSeconds.startTimer).toHaveBeenCalled();
    });
  });
});
