import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoryModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
