import { Provider } from '@nestjs/common';
import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { register } from 'prom-client';

export const makeHttpReqTotal = (): Provider =>
  makeCounterProvider({
    name: 'nestjs_http_requests_total',
    help: 'Total number of requests to API Gateway',
    registers: [register],
  });

export const makeHttpReqFailTotal = (): Provider =>
  makeHistogramProvider({
    name: 'nestjs_http_requests_fail_total',
    help: 'Total number of failed requests to API Gateway',
    labelNames: ['path', 'method'],
    registers: [register],
  });

export const makeHttpReqTimeSeconds = (): Provider =>
  makeHistogramProvider({
    name: 'nestjs_http_requests_time_seconds',
    help: 'Duration http requests in seconds',
    labelNames: ['path', 'method'],
    registers: [register],
  });

export const makeDBResTimeSeconds = (): Provider =>
  makeHistogramProvider({
    name: 'database_response_time_seconds',
    help: 'Database response time in seconds',
    labelNames: ['operation', 'success'],
    registers: [register],
  });

export const MakeMetricsProvider = (): Provider[] => {
  return [
    makeHttpReqTotal(),
    makeHttpReqFailTotal(),
    makeHttpReqTimeSeconds(),
    makeDBResTimeSeconds(),
  ];
};
