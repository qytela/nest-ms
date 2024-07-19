import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { uuid } from 'uuidv4';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: () => (process.env.KAFKA_BROKERS as string).split(','),
          },
          consumer: {
            groupId: 'auth-consumer-' + uuid(),
          },
        },
      },
      {
        name: 'LOG_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'log',
            brokers: () => (process.env.KAFKA_BROKERS as string).split(','),
          },
          consumer: {
            groupId: 'log-consumer-' + uuid(),
          },
        },
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
