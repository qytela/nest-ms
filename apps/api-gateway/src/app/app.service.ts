import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { PromService } from './prom.service';

import type { Counter, Histogram } from 'prom-client';

@Injectable()
export class AppService {
  constructor(
    @InjectMetric('nestjs_http_requests_total') public httpReqTotal: Counter<string>,
    @InjectMetric('nestjs_http_requests_fail_total') public httpReqFailTotal: Histogram<string>,
    @InjectMetric('nestjs_http_requests_time_seconds') public httpReqTimeSeconds: Histogram<string>,
    @InjectMetric('database_response_time_seconds') public dbResTimeSeconds: Histogram<string>,
    private readonly promService: PromService
  ) {}

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
