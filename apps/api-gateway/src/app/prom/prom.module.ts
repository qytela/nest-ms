import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { PromService } from './prom.service';
import { MakeMetricsProvider } from 'shared/utils/prom-client/MakeMetricsProvider';

@Module({
  imports: [PrometheusModule.register()],
  providers: [PromService, ...MakeMetricsProvider()],
  exports: [PromService],
})
export class PromModule {}
