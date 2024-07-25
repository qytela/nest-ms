import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { MakeMetricsProvider } from 'shared/utils/prom-client/MakeMetricsProvider';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromService } from './prom.service';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { CategoryModule } from './movie/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrometheusModule.register(),
    AuthModule,
    MovieModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, PromService, ...MakeMetricsProvider()],
})
export class AppModule {}
