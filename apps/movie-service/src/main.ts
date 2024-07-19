/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094'],
        },
        consumer: {
          groupId: 'movie-consumer',
        },
      },
    }
  );
  await app.listen();
  Logger.log(`🚀 movie-service running`);
}

bootstrap();
