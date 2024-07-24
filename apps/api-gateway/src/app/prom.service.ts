import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

import type { Counter, Histogram } from 'prom-client';
import type { IPromService, IStartHTTPTimerOptions } from '../interfaces/prom.service.interface';

@Injectable()
export class PromService {
  private req: Request;
  private options: IStartHTTPTimerOptions;

  constructor(
    @InjectMetric('nestjs_http_requests_total') public httpReqTotal: Counter<string>,
    @InjectMetric('nestjs_http_requests_fail_total') public httpReqFailTotal: Histogram<string>,
    @InjectMetric('nestjs_http_requests_time_seconds') public httpReqTimeSeconds: Histogram<string>,
    @InjectMetric('database_response_time_seconds') public dbResTimeSeconds: Histogram<string>
  ) {}

  startHttpTimer(req: Request, options: IStartHTTPTimerOptions): IPromService {
    this.req = req;
    this.options = options;

    this.httpReqTotal.inc();

    return this;
  }

  success(): void {
    const httpReqTimer = this.httpReqTimeSeconds.startTimer();
    const dbResTimer = this.dbResTimeSeconds.startTimer();

    httpReqTimer({ path: this.req.url, method: this.req.method });
    dbResTimer({ operation: this.options.operation, success: 'OK' });
  }

  fail(): void {
    const httpReqFailTimer = this.httpReqFailTotal.startTimer();
    const dbResTimer = this.dbResTimeSeconds.startTimer();

    httpReqFailTimer({ path: this.req.url, method: this.req.method });
    dbResTimer({ operation: this.options.operation, success: 'ERR' });
  }
}
