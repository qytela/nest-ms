/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: () => (process.env.KAFKA_BROKERS as string).split(','),
      },
      consumer: {
        groupId: 'log-consumer',
      },
    },
  });
  await app.listen();
  Logger.log(`🚀 log-service running`);
}

bootstrap();
