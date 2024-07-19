import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './log/log.module';

@Module({
  imports: [ConfigModule.forRoot(), LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
