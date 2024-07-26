import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromModule } from './prom/prom.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { CategoryModule } from './movie/category/category.module';

@Module({
  imports: [ConfigModule.forRoot(), PromModule, AuthModule, MovieModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
