import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { register } from 'prom-client';

export const makeHttpReqTotal = () =>
  makeCounterProvider({
    name: 'nestjs_http_requests_total',
    help: 'Total number of requests to API Gateway',
    registers: [register],
  });

export const makeHttpReqFailTotal = () =>
  makeHistogramProvider({
    name: 'nestjs_http_requests_fail_total',
    help: 'Total number of failed requests to API Gateway',
    labelNames: ['path', 'method'],
    registers: [register],
  });

export const makeHttpReqTimeSeconds = () =>
  makeHistogramProvider({
    name: 'nestjs_http_requests_time_seconds',
    help: 'Duration http requests in seconds',
    labelNames: ['path', 'method'],
    registers: [register],
  });

export const makeDBResTimeSeconds = () =>
  makeHistogramProvider({
    name: 'database_response_time_seconds',
    help: 'Database response time in seconds',
    labelNames: ['operation', 'success'],
    registers: [register],
  });
