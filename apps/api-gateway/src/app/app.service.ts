import { Injectable } from '@nestjs/common';
import { PromService } from './prom/prom.service';

@Injectable()
export class AppService {
  constructor(private readonly promService: PromService) {}

  getData(req: Request): { message: string } {
    const timer = this.promService.startHttpTimer(req, { operation: 'app.service-getData' });
    timer.success();

    return { message: 'Hello API' };
  }

  testFail(req: Request): { message: string } {
    const timer = this.promService.startHttpTimer(req, { operation: 'app.service-testFail' });
    timer.fail();

    return { message: 'Test Fail Route' };
  }
}
